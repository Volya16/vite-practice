export function renderCardGallery(img) {
    return img.map(i => `<li><img src="${i.urls.small}" alt="${i.alt_description}"></li>`).join("");
}