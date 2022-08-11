const scrollBar = document.querySelector(".scrollBar");
const imgBox = document.querySelector(".imgBox");
const author = document.getElementById("author");
const width = document.getElementById("width");
const height = document.getElementById("height");
const checkBox = document.getElementById("checkBox");
const slider = document.getElementById("slider");
const loading = document.querySelector(".loading")

let isGrayChecked = "";
let sliderPosition = "";

const loadingActive = () => {
    loading.classList.add("visible")
}
const loadingStop = () => {
    loading.classList.remove("visible")
}

scrollBar.addEventListener("scroll", () => {
    const {scrollTop, scrollHeight, clientHeight} = scrollBar;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
        loadingActive()
        let randomNum = Math.floor(Math.random() * 100)
        fetch(`https://picsum.photos/v2/list?page=${randomNum}&limit=5`)
            .then(response => response.json())
            .then(data => {
                loadPics(data)
                setTimeout(loadingStop, 1000)
            });
    }
});

const loadPics = (data) => {
    data.map(x => {
        const img = document.createElement("img")
        img.src = x.download_url
        scrollBar.appendChild(img)
        img.addEventListener("click", function () {
            imgBox.style.backgroundImage = "url(" + x.download_url + ")"
            author.innerText = x.author
            width.innerText = "Width: " + x.width + "px"
            height.innerText = "Height: " + x.height + "px"
        });
    })
};

fetch('https://picsum.photos/v2/list?&limit=5')
    .then(response => response.json())
    .then(data => loadPics(data));

checkBox.onclick = () => {
    isGrayChecked = checkBox.checked ? " grayscale(100%)" : " grayscale(0%)"
    imgBox.style.filter = isGrayChecked + sliderPosition
};

slider.onchange = () => {
    switch (slider.value) {
        case "0":
            sliderPosition = " blur(0)";
            break;
        case "1":
            sliderPosition = " blur(2px";
            break;
        case "2":
            sliderPosition = " blur(4px)";
            break;
        case "3":
            sliderPosition = " blur(6px)";
            break;
        case "4":
            sliderPosition = " blur(8px)";
            break;
        case "5":
            sliderPosition = " blur(10px)";
    }
    imgBox.style.filter = isGrayChecked + sliderPosition;
};


