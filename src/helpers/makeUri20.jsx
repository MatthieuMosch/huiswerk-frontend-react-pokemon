function makeUri20(uri) {
    try {
        return uri.slice(0, uri.lastIndexOf("&limit") + 6) + "=20";
    } catch {
        return uri;
    }
}

export default makeUri20;