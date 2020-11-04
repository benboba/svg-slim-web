export async function readFile(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const input = reader.result as string;
			resolve(input);
        };
        reader.onerror = reject;
        reader.onabort = reject;
		reader.readAsText(file);
	});
}
