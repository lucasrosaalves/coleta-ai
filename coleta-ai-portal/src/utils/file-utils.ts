export const getBase64 = (
  file: File,
  resultReader: (value: string | undefined) => void
) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    resultReader(reader.result as string);
  };
  reader.onerror = function (error) {
    console.log("getBase64 Error: ", error);
    resultReader(undefined);
  };
};
