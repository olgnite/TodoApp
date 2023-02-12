export const AddFileService = {

    /**
     * Функция возвращает названия файлов
     * @param {any} event
     */
    addFile: (event: any): string[] => {
        event.preventDefault();

        let selectedFiles: string[] = [];

        if (event.target.files) {
            let pendingFiles: string[] = selectedFiles;
            [...event.target.files].forEach((_: any, i: number) => {
                pendingFiles.push(event.target.files[i].name);
                selectedFiles = pendingFiles
            });
        }
        return selectedFiles;
    },
}
