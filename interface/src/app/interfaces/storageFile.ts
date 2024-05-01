export class StorageFile {
    name: string = '';
    extension: string | null = null;
    url: string | null = null;

    constructor(ref: any) {
        if (ref) {
            this.url = ref.fullPath;
        }
    }

    isImage(): boolean {
        return (this.extension != null && ['jpeg', 'jpg', 'png'].includes(this.extension.toLowerCase()));
    }

    isVideo(): boolean {
        return (this.extension != null && ['mp4', 'mov'].includes(this.extension.toLowerCase()));
    }
}