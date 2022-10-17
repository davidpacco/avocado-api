const urlApi = 'https://platzi-avo.vercel.app/api/avo'

const appNode = document.querySelector('#app')
appNode.className = 'grid gap-5 grid-cols-2'

const formatPrice = price => {
  let newPrice = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  return newPrice
}

async function fetchData(url) {
  const response = await fetch(url)
  const data = await response.json()

  let allItems = []

  data.data.forEach(item => {
    const img = document.createElement('img')
    img.src = `https://platzi-avo.vercel.app${item.image}`
    img.className = 'row-span-full p-3 rounded-3xl'

    const title = document.createElement('h2')
    title.textContent = item.name
    title.className = 'text-xl font-bold col-span-2'

    const description = document.createElement('p')
    description.textContent = item.attributes.taste
    description.className = 'row-start-2 col-start-2 col-span-2'

    const price = document.createElement('p')
    price.textContent = formatPrice(item.price)
    price.className = 'text-lg'
    // price.append(`${item.price}`)

    const container = document.createElement('div')
    container.append(img, title, description, price)
    container.className = 'grid grid-cols-3 grid-rows-3 text-left border-solid border border-slate-500 shadow-md rounded-2xl items-center overflow-hidden hover:bg-gray-100 cursor-pointer'

    allItems.push(container)
  });

  appNode.append(...allItems)
}

fetchData(urlApi)
