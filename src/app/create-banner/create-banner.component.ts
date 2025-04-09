import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {
  selectedImage: string | null = null;

  bannerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.bannerForm = this.fb.group({
      userReceived: ['', [Validators.required]],
      publishType: ['now', [Validators.required]],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
      navigateTo: ['internal', [Validators.required]],
      bannerImage: ['', [Validators.required]], // เพิ่ม required สำหรับรูปภาพ
      internalUrl: [''],
      internalUrlSuffix: [''],
      externalUrl: [''],
      externalUrlSuffix: [''],
      inappPage: ['']
    });
  }

  get isFormValid(): boolean {
    const form = this.bannerForm;
    const publishType = form.get('publishType')?.value;
    const navigateTo = form.get('navigateTo')?.value;

    // ตรวจสอบข้อมูลพื้นฐาน
    if (!form.get('userReceived')?.valid || !this.selectedImage) {
      return false;
    }

    // ตรวจสอบข้อมูลตาม publishType
    if (publishType === 'schedule') {
      if (!form.get('startDate')?.value || !form.get('startTime')?.value) {
        return false;
      }
    } else if (publishType === 'range') {
      if (!form.get('startDate')?.value || !form.get('endDate')?.value ||
        !form.get('startTime')?.value || !form.get('endTime')?.value) {
        return false;
      }
    }

    // ตรวจสอบข้อมูลตาม navigateTo
    if (navigateTo === 'internal') {
      if (!form.get('internalUrl')?.value || !form.get('internalUrlSuffix')?.value) {
        return false;
      }
    } else if (navigateTo === 'external') {
      if (!form.get('externalUrl')?.value || !form.get('externalUrlSuffix')?.value) {
        return false;
      }
    } else if (navigateTo === 'inapp') {
      if (!form.get('inappPage')?.value) {
        return false;
      }
    }

    return true;
  }



  ngOnInit(): void {
  }



  onSubmit() {
    console.log('Submit button clicked');
    if (this.bannerForm.valid) {
      // สร้าง payload สำหรับส่งไป API
      const formData = new FormData();

      formData.append('userReceived', this.bannerForm.get('userReceived')?.value);
      formData.append('publishType', this.bannerForm.get('publishType')?.value);

      // จัดการข้อมูลวันที่และเวลาตาม publishType
      const publishType = this.bannerForm.get('publishType')?.value;
      if (publishType === 'schedule') {
        formData.append('startDate', this.bannerForm.get('startDate')?.value);
        formData.append('startTime', this.bannerForm.get('startTime')?.value);
      } else if (publishType === 'range') {
        formData.append('startDate', this.bannerForm.get('startDate')?.value);
        formData.append('endDate', this.bannerForm.get('endDate')?.value);
        formData.append('startTime', this.bannerForm.get('startTime')?.value);
        formData.append('endTime', this.bannerForm.get('endTime')?.value);
      }

      // จัดการข้อมูล Navigation
      const navigateTo = this.bannerForm.get('navigateTo')?.value;
      formData.append('navigationType', navigateTo);

      if (navigateTo === 'internal') {
        formData.append(
          'url',
          `${this.bannerForm.get('internalUrl')?.value}${this.bannerForm.get('internalUrlSuffix')?.value}`
        );
      } else if (navigateTo === 'external') {
        formData.append(
          'url',
          `${this.bannerForm.get('externalUrl')?.value}${this.bannerForm.get('externalUrlSuffix')?.value}`
        );
      } else if (navigateTo === 'inapp') {
        formData.append('inappPage', this.bannerForm.get('inappPage')?.value);
      }

      // จัดการรูปภาพ
      if (this.selectedImage) {
        const base64Data = this.selectedImage.split(',')[1];
        const blob = this.base64ToBlob(base64Data, 'image/jpeg');
        formData.append('bannerImage', blob, 'banner.jpg');
      }

      const formDataObj: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value instanceof Blob ? 'File Data' : value;
      });

      console.log('Form Data for API:', {
        userReceived: formData.get('userReceived'),
        publishType: formData.get('publishType'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        navigationType: formData.get('navigationType'),
        url: formData.get('url'),
        inappPage: formData.get('inappPage'),
        bannerImage: formData.get('bannerImage') ? 'File Data Present' : null
      });

      // ✅ จำลอง Response จาก API
      setTimeout(() => {
        const response = {
          status: 'success',
          message: 'Banner created successfully!',
          data: formDataObj
        };

        console.log('API Response:', response);
        alert(response.message);

        // นำทางกลับหน้ารายการแบนเนอร์
        // this.router.navigate(['/banners']);
      }, 1000); // 1 วินาทีเหมือนโหลดข้อมูล
    }
    console.warn('Form is invalid', this.bannerForm.value, this.bannerForm.errors);
  }


  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          this.selectedImage = e.target.result;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImage = null;
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onCancel() {
    // จัดการเมื่อกดปุ่ม Cancel
    this.router.navigate(['/banners']);
  }



}
