const puppeteer = require('puppeteer');

async function getMetadata(url) {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navega a la URL proporcionada
    await page.goto(url);

    // Obtiene los metadatos
    const metadata = await page.evaluate(() => {
        return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || '',
            url: window.location.href
        };
    });

    await browser.close();

    return metadata;
}

// Ejemplo de uso
const url = 'https://www.ideassoftperu.com';
getMetadata(url).then(metadata => {
    console.log(metadata);
});
