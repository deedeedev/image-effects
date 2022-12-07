async function init() {
    let rustApp = null;

    try {
        rustApp = await import("../pkg");
    } catch (e) {
        console.error(e);
        return;
    }

    const input = document.getElementById("upload");
    const fileReader = new FileReader();

    // viene chiamata ogni volta che un file è stato letto
    fileReader.onloadend = () => {
        // elimino i metadati aggiunti dal browser durante la conversione a base64
        const base64 = fileReader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
        let img_data_url = rustApp.grayscale(base64);
        document.getElementById("new-img").setAttribute("src", img_data_url);
    };

    input.addEventListener("change", () => {
        // leggo il file convertendolo direttamente in stringa
        fileReader.readAsDataURL(input.files[0]);
    });
}

init();
