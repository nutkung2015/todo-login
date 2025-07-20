import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Add this import



@Component({
  selector: 'app-update-banner-dialog',
  templateUrl: './update-banner-dialog.component.html',
  styleUrls: ['./update-banner-dialog.component.css']
})
export class UpdateBannerDialogComponent implements OnInit {
  updateForm: FormGroup;
  selectedImage: string | null = null;
  private apiUrl = 'http://192.168.1.134:8000/updateCatalog';

  navigationTypes = [
    { value: '1', label: 'Internal' },
    { value: '2', label: 'External' },
    { value: '3', label: 'In-app' }
  ];



  constructor(
    private dialogRef: MatDialogRef<UpdateBannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.updateForm = this.fb.group({
      id: [this.data.id],
      status: ['send',],
      userReceived: ['', [Validators.required]],
      publishType: [0, [Validators.required]],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
      check_nav_button: [''],
      navTo: [''],
      publishDate: [''], // เพิ่ม publishDate control
      publishEnd: [''],
      bannerImage: [''], // เพิ่ม required สำหรับรูปภาพ
      internalUrl: [''],
      // internalUrlSuffix: [''],
      externalUrl: [''],
      // externalUrlSuffix: [''],
      inappPage: ['']
    });

    if (data.image) {
      this.selectedImage = data.image;
    }
  }

  ngOnInit(): void {
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      // Create image object to check dimensions
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        img.src = e.target.result;
        img.onload = () => {
          this.selectedImage = e.target.result;
          this.updateForm.patchValue({
            image: e.target.result
          });
        };
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.updateForm.patchValue({
      image: null
    });
  }


  onSubmit() {
    if (this.updateForm.valid) {
      const formData = new FormData();

      // User received value
      formData.append('user_received', this.updateForm.get('userReceived')?.value || 'all');

      // Handle publish type and dates
      const publishType = this.updateForm.get('publishType')?.value;
      formData.append('check_publish_button', publishType);

      if (publishType === '1' || publishType === '2') {
        const startDate = new Date(this.updateForm.get('startDate')?.value);
        const startTime = this.updateForm.get('startTime')?.value || '00:00';
        const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')} ${startTime}`;
        formData.append('publish_start', formattedStartDate);

        if (publishType === '2') {
          const endDate = new Date(this.updateForm.get('endDate')?.value);
          const endTime = this.updateForm.get('endTime')?.value || '23:59';
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
        formData.append('publi sh_end', formattedNow);
      }

      // Navigation handling
      const navigateTo = this.updateForm.get('navigateTo')?.value;
      formData.append('check_nav_button', '');
      formData.append('nav_to', navigateTo);

      // URL handling based on navigation type
      if (navigateTo === '1') {
        formData.append('url', this.updateForm.get('internalUrl')?.value || '');
      } else if (navigateTo === '2') {
        formData.append('url', this.updateForm.get('externalUrl')?.value || '');
      } else if (navigateTo === '3') {
        formData.append('inappPage', this.updateForm.get('inappPage')?.value || '');
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

      const formattedStartDate = this.updateForm.value.startDate ?
        `${new Date(this.updateForm.value.startDate).toISOString().split('T')[0]} ${this.updateForm.value.startTime || '00:00'}` : '';

      const formattedEndDate = this.updateForm.value.endDate ?
        `${new Date(this.updateForm.value.endDate).toISOString().split('T')[0]} ${this.updateForm.value.endTime || '23:59'}` : '';

      const navUrl = this.updateForm.value[navigateTo === '1' ? 'internalUrl' :
        navigateTo === '2' ? 'externalUrl' : 'inappPage'] || '';
      formData.append('nav_to', navUrl);

      // const formData = {
      //   ...this.updateForm.value,
      //   id: this.data.id // ใส่ ID เดิมกลับไป
      // };

      console.log('ID from data:', this.data.id);
      let updateData = {
        id: this.data.id, // 
        page: 1,
        video: 1, // เปลี่ยนจาก string เป็น number
        image: this.selectedImage || '',
        description: 'Banner Description',
        create_by: 'admin',
        last_update_by: 'admin',
        status: 'send',
        view: 1,
        click: 0,
        operator: 'charge24',
        user_received: this.updateForm.value.userReceived || 'all',
        check_publish_button: parseInt(this.updateForm.value.publishType) || 0,
        publish_start: this.updateForm.value.publishType === '0' ?
          new Date().toISOString().replace('T', ' ').split('.')[0] : formattedStartDate || null,
        publish_end: this.updateForm.value.publishType === '0' ?
          new Date().toISOString().replace('T', ' ').split('.')[0] : formattedEndDate || null,
        nav_to: this.updateForm.value.navTo || '',
        // check_nav_button: parseInt(this.updateForm.value.check_nav_button),
        check_nav_button: parseInt(this.updateForm.value.check_nav_button) || 0,
      };

      console.log("update naaaa", updateData)

      if (!this.data.id) {
        alert('Invalid ID');
        return;
      }

      this.http.put(`${this.apiUrl}/${this.data.id}`, updateData, { // Update API URL with ID
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe({
        next: (response: any) => {
          console.log('Success:', response);
          console.log('Request Data:', updateData);
          alert('Banner updated successfully!'); // Changed message to "updated"
        },
        error: (error: any) => { // Add type annotation
          console.error('Error Details:', error);
          console.log('Request Data:', updateData);
          alert(`Failed to update banner: ${error.error?.message || error.message}`);
        }
      });

      this.dialogRef.close(formData);
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



  onCancel() {
    this.dialogRef.close();
  }


}
