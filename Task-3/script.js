// Image Item Element
const imageItem = document.createElement('div')
      imageItem.classList.add('imageItem')
      imageItem.innerHTML = `<img src="" alt="">`;

// Image Container Selector
const ImageContainer = document.getElementById('gallery-container')
// Image Category Selector
const catContainer = document.getElementById('category-container')

// Image Category Button Element
const catBtnItem = document.createElement('button')
        catBtnItem.type = 'button'
        catBtnItem.classList.add('catbtn')
        catBtnItem.classList.add('btn')
        catBtnItem.classList.add('btn-sm')
        catBtnItem.classList.add('rounded-0')

let images = {}
let categories = ['all']

window.onload = async () =>{
    /**Fetch Gallery Data */
    await fetch('data.json')
    .then(response =>{
        return response.json()
    })
    .then(JSONdata=>{
        images = JSONdata
        Object.values(images).map(image => {
            if(!categories.includes(image.category_name))
            categories.push(image.category_name)
        })
    }) 

    // Load Category Buttons
    await load_categories()
    // Shuffle Image Data
    await shuffleImages()
    // Load Image Data
    await load_images()

    catContainer.querySelectorAll('.catbtn').forEach(catBTN => {
        //Add Click Event Listener to Category Button to filter 
        catBTN.addEventListener('click', filterGallery.bind(null, catBTN))
    })
   
}

//Shuffle Image Data Function
const shuffleImages = () =>{
    var shuffle = images
    for (var i = 0; i  < (shuffle.length - 1); i++ ){
        var k = Math.floor(Math.random() * (i +1));
        var image = shuffle[i]
        shuffle[i] = shuffle[k]
        shuffle[k] = image
    }
    images = shuffle
}


//Load Category Buttons Function
const load_categories = () =>{
    categories.forEach(category => {
        var btn = catBtnItem.cloneNode(true)
        btn.innerText = category
        catContainer.append(btn)
    })
    catContainer.querySelector('.catbtn:nth-child(1)').classList.add('active')
}

//Load Image Items Function
const load_images = () =>{
    images.forEach(image => {
        var item = imageItem.cloneNode(true)
        item.dataset.category=image.category_name
        item.querySelector('img').src = image.img_path
        ImageContainer.appendChild(item)
    });
}

// Filter Gallery By selected Category
const filterGallery = (selectedCatBTN) => {
    //Update Active Category Button
    catContainer.querySelectorAll('.catbtn').forEach(catBTN => {
        if(selectedCatBTN == catBTN){
            if(!catBTN.classList.contains('active'))
                catBTN.classList.add('active');
        }else{
            if(catBTN.classList.contains('active'))
                catBTN.classList.remove('active');
        }
    })

    // Get selected category
    var cat = selectedCatBTN.innerText.toLowerCase()

    //Hide Images that category are not equal to selected category
    ImageContainer.querySelectorAll('.imageItem').forEach(item=>{
        if(cat == "all" || cat == item.dataset.category){
            item.style.display = 'block'
        }else{
            item.style.display = 'none'
        }
    })
}