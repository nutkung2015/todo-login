import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {
  selectedImage: string | null = null;

  private apiUrl = 'http://192.168.1.134:8000/insertCatalog';
  // 192.168.1.134


  bannerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.bannerForm = this.fb.group({
      userReceived: ['', [Validators.required]],
      publishType: ['now', [Validators.required]],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
      navigateTo: ['internal', [Validators.required]],
      bannerImage: [''], // เพิ่ม required สำหรับรูปภาพ
      internalUrl: [''],
      // internalUrlSuffix: [''],
      externalUrl: [''],
      // externalUrlSuffix: [''],
      inappPage: ['']
    });
  }

  get isFormValid(): boolean {
    const form = this.bannerForm;
    const publishType = form.get('publishType')?.value;
    const navigateTo = form.get('navigateTo')?.value;

    // ตรวจสอบข้อมูลพื้นฐาน
    if (!form.get('userReceived')?.valid) {
      return false;
    }

    // ตรวจสอบข้อมูลตาม publishType
    if (publishType === '1') {
      if (!form.get('startDate')?.value || !form.get('startTime')?.value) {
        return false;
      }
    } else if (publishType === '2') {
      if (!form.get('startDate')?.value || !form.get('endDate')?.value ||
        !form.get('startTime')?.value || !form.get('endTime')?.value) {
        return false;
      }
    }

    // ตรวจสอบข้อมูลตาม navigateTo
    if (navigateTo === 'internal') {
      if (!form.get('internalUrl')?.value) {
        return false;
      }
    } else if (navigateTo === 'external') {
      if (!form.get('externalUrl')?.value) {
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
    if (this.bannerForm.valid) {
      const formData = new FormData();

      // Required fields with default values
      formData.append('page', '1');
      formData.append('video', '1');
      formData.append('image', '1');
      formData.append('description', 'Banner Description');
      formData.append('create_by', 'admin');
      formData.append('last_update_by', 'admin');
      formData.append('status', 'send');
      formData.append('view', '1');
      formData.append('click', '0');
      formData.append('operator', 'charge24');

      // User received value
      formData.append('user_received', this.bannerForm.get('userReceived')?.value || 'all');

      // Handle publish type and dates
      const publishType = this.bannerForm.get('publishType')?.value;
      formData.append('check_publish_button', publishType);

      if (publishType === '1' || publishType === '2') {
        const startDate = new Date(this.bannerForm.get('startDate')?.value);
        const startTime = this.bannerForm.get('startTime')?.value || '00:00';
        const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')} ${startTime}`;
        formData.append('publish_start', formattedStartDate);

        if (publishType === '2') {
          const endDate = new Date(this.bannerForm.get('endDate')?.value);
          const endTime = this.bannerForm.get('endTime')?.value || '23:59';
          const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')} ${endTime}`;
          formData.append('publish_end', formattedEndDate);
        } else {
          formData.append('publish_end', formattedStartDate);
        }
      } else {
        // For immediate publish (type 0)
        const now = new Date();
        const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        formData.append('publish_start', formattedNow);
        formData.append('publish_end', formattedNow);
      }

      // Navigation handling
      const navigateTo = this.bannerForm.get('navigateTo')?.value;
      formData.append('check_nav_button', '1');
      formData.append('nav_to', navigateTo);

      // URL handling based on navigation type
      if (navigateTo === '1') {
        formData.append('url', this.bannerForm.get('internalUrl')?.value || '');
      } else if (navigateTo === '2') {
        formData.append('url', this.bannerForm.get('externalUrl')?.value || '');
      } else if (navigateTo === '3') {
        formData.append('inappPage', this.bannerForm.get('inappPage')?.value || '');
      }

      // Image handling
      if (this.selectedImage) {
        const base64Data = this.selectedImage.split(',')[1];
        const blob = this.base64ToBlob(base64Data, 'image/jpeg');
        formData.append('image', blob, 'banner.jpg');
      }

      // Log form data for debugging
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const formattedStartDate = this.bannerForm.value.startDate ?
        `${new Date(this.bannerForm.value.startDate).toISOString().split('T')[0]} ${this.bannerForm.value.startTime || '00:00'}` : '';

      const formattedEndDate = this.bannerForm.value.endDate ?
        `${new Date(this.bannerForm.value.endDate).toISOString().split('T')[0]} ${this.bannerForm.value.endTime || '23:59'}` : '';

      const navUrl = this.bannerForm.value[navigateTo === '1' ? 'internalUrl' :
        navigateTo === '2' ? 'externalUrl' : 'inappPage'] || '';
      formData.append('nav_to', navUrl);

      console.log('1 =>', formData)
      let requestData = {
        page: 1,
        video: '1',
        image: this.selectedImage || '',  // เพิ่ม image กลับมา
        description: 'Banner Description',
        create_by: 'admin',
        last_update_by: 'admin',
        status: 'send',
        view: 1,
        click: 0,
        operator: 'charge24',
        user_received: this.bannerForm.value.userReceived,
        check_publish_button: parseInt(this.bannerForm.value.publishType),
        publish_start: this.bannerForm.value.publishType === '0' ?
          new Date().toISOString().replace('T', ' ').split('.')[0] : formattedStartDate || null,
        publish_end: this.bannerForm.value.publishType === '0' ?
          new Date().toISOString().replace('T', ' ').split('.')[0] : formattedEndDate || null,
        nav_to: this.bannerForm.value.navigateTo === '1' ? this.bannerForm.value.internalUrl :
          this.bannerForm.value.navigateTo === '2' ? this.bannerForm.value.externalUrl :
            this.bannerForm.value.inappPage,  // แก้ไขการเลือก nav_to
        check_nav_button: 1  // เปลี่ยนเป็นค่าคงที่
      };


      // Send to API
      this.http.post(this.apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe({
        next: (response: any) => {
          console.log('Success:', response);
          console.log('Request Data:', requestData);  // เพิ่ม log เพื่อดูข้อมูลที่ส่ง
          alert('Banner created successfully!');
        },
        error: (error) => {
          console.error('Error Details:', error);
          console.log('Request Data:', requestData);  // เพิ่ม log เพื่อดูข้อมูลที่ส่ง
          alert(`Failed to create banner: ${error.error?.message || error.message}`);
        }
      });
    }
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
