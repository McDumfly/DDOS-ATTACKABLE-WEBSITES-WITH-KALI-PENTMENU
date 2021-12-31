const getId = (id) => {
    return document.getElementById(String(id));
}

let sites = [];

function ud() {
    let r1Data = "";
    for (let i = 0; i < sites.length; i++) {
        r1Data += "<span># </span>" + sites[i] + "<br>";
    }
    getId("result").innerHTML = String(r1Data);
    getId("result2").innerHTML = String(JSON.stringify(sites));
    localStorage.setItem("savedSites", JSON.stringify(sites));
}

const savedSites = localStorage.getItem("savedSites");
if (savedSites !== null) {
    sites = JSON.parse(savedSites);
    ud();
}

function addWeb() {
    const url = getId("url").value;
    const ip = getId("ip").value;
    sites.push(url + " - " + ip);
    ud();
}

function deleteWeb() {
    const url = getId("url").value;
    const ip = getId("ip").value;
    sites.splice(sites.indexOf(url + " - " + ip), 1);
    ud();
}

let importFile = getId("importFile");
importFile.addEventListener('change', () => {
    let files = importFile.files;
    if(files.length == 0) return;
    const file = files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;
        sites = JSON.parse(file);
        ud();
    };
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file); 
});

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}