const key = "&key=AIzaSyBBOB0l7zOAj19hkgjw5Oub4sw4r0HaEMg";
const url = "https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId="
const songChannel = ["UC0C-w0YjGpqDXGB8IHb662A","UCANLZYMidaCbLQFWXBC95Jg"]//[Ed Sheeran(5),Taylor Swift(5)]
const gamesChannel = ["UCfDT9kxAHL6M5Ssnbw02vZw","UCEe2aqK4fgDYTOjkZvTvang","UChhGJONwU_9ODfq5oy1dUaQ"] //[KCH Games TV,KingJoe83,HowAboutBeirut(Prank)]
const moviesChannel = ["UCkAGrHCLFmlK3H2kd6isipg","UC7p3ER4LwElVAtmgWFdwhgQ"] //[Mr Bean,Monsters Inc Full Movie in English - New Animation Movie]
const sportsChannel = ["UCr5vPy2YUScYtiyAYiGn2Rg","UCRijo3ddMTht_IHyNSNXpNQ"] //[Wrzzer,Dude Perfect]
let songList = [];
let gameList = [];
let movieList = [];
let sportList = [];
let allWatchLaters = [];


document.addEventListener("DOMContentLoaded", function(){
   
    songChannel.forEach(channel => { fetchSong(channel) })
    gamesChannel.forEach(channel => { fetchGames(channel) })
    moviesChannel.forEach(channel => {fetchMovies(channel)})
    sportsChannel.forEach(channel => {fetchSport(channel)})
    listenForEnter();
    listenForButtons();
    fetchWatchLater();
    
})

function fetchSong(channelId) 
{
    fetch(url+channelId+key) 
    .then(resp => resp.json())
    .then(data => { 
        listOfSongs(data)
        // listenToWatchLater();  //Call the watch later
 })
}

function listOfSongs(data)
{
    for (let song in data.items) 
    {   if (data.items[song].contentDetails.upload)
        {   
            let songTitle = data.items[song].snippet.title
            let songUrl = "https://www.youtube.com/watch?v="+data.items[song].contentDetails.upload.videoId
            songList.push({Title:songTitle,url:songUrl});
        }
    }
    return songList;
}

function fetchGames(channelId)
{
    fetch(url+channelId+key) 
    .then(resp => resp.json())
    .then(data => { listOfGames(data) })
}

function listOfGames(data)
{
    for (let game in data.items) 
    {   if (data.items[game].contentDetails.upload)
        {   
            let gameTitle = data.items[game].snippet.title
            let gameUrl = "https://www.youtube.com/watch?v="+data.items[game].contentDetails.upload.videoId
            gameList.push({Title:gameTitle,url:gameUrl});
        }
    }
    return gameList;
}

function fetchMovies(channelId)
{
    fetch(url+channelId+key) 
    .then(resp => resp.json())
    .then(data => { listOfMovies(data) })
}

function listOfMovies(data)
{
    for (let movie in data.items) 
    {   if (data.items[movie].contentDetails.upload)
        {   
            let movieTitle = data.items[movie].snippet.title
            let movieUrl = "https://www.youtube.com/watch?v="+data.items[movie].contentDetails.upload.videoId
            movieList.push({Title:movieTitle,url:movieUrl});
        }
    }
    return movieList;
}

function fetchSport(channelId) 
{
    fetch(url+channelId+key) 
    .then(resp => resp.json())
    .then(data => { listOfSports(data) })
}

function listOfSports(data)
{
    for (let sport in data.items) 
    {   if (data.items[sport].contentDetails.upload)
        {   
            let sportTitle = data.items[sport].snippet.title
            let sportUrl = "https://www.youtube.com/watch?v="+data.items[sport].contentDetails.upload.videoId
            sportList.push({Title:sportTitle, url:sportUrl});
        }
    }
    return sportList;
}

function listenForButtons()
{
    document.getElementById("dog-bar").addEventListener("click", handleClick)
}

function listenForEnter() {

    const nav = document.getElementById("sidebar")
    nav.style.display = "none"

    const submit = document.getElementById("submitname")
    const name = document.getElementById("nameform")
    name.addEventListener("submit", function(event) {
    event.preventDefault()
    renderMyProfile()
    })
}

function handleClick(event)
{
    
    document.getElementById("dog-info").style.display = "block"

        if (event.target.textContent === 'Songs')
        {
            switchButtonColors()
            renderHomePage(songList)
            
            const ulTag = document.getElementById("side-bar")
            const barTag = document.getElementById("sidebar")
            barTag.style.display = "block"
            ulTag.innerHTML = ""
           let i = 0
           const iframe = `
               <iframe src="https://ntmaker.gfto.ru/newneontexten/?image_height=200&image_width=600&image_font_shadow_width=30&image_font_size=40&image_background_color=1D1919&image_text_color=F5A1FF&image_font_shadow_color=F7406B&image_url=&image_text=Click Title Below👇&image_font_family=Nickainley&" frameborder='no' scrolling='no' width="300" height="100"></iframe>         
               `
               ulTag.innerHTML += iframe
            for (const song in songList) 
            {
                let createLi = document.createElement("Li")
                createLi.setAttribute("class", "item-list")
                let createA = document.createElement("a")
                createA.textContent = songList[song].Title.split("(")[0]
                // createA.setAttribute("href",`${songList[song].url}`)
                createA.setAttribute('id', `${i++}`)
                createA.setAttribute('onclick','showSongInfo()')
                createA.onclick = function() {showSongInfo();};
                createLi.appendChild(createA)
                ulTag.appendChild(createLi)
            }
           
                
                
                
            }
    else if (event.target.textContent === 'Sport')
    {
        switchButtonColors()
        renderHomePage(sportList)
        renderElements(sportList)
    }
    else if (event.target.textContent === 'News')
    {
        console.log("you are in the news tab")
    }
    else if (event.target.textContent === 'Games')
    {
        switchButtonColors()
        renderHomePage(gameList)
        renderElements(gameList)
    }
    else if (event.target.textContent === 'Movies')
    {
        switchButtonColors()
        renderHomePage(movieList)
        renderElements(movieList)
    }
    else if (event.target.textContent === 'My Profile')
    {
        renderMyProfile()
    }
    
}

function showSongInfo() {
    const dogContainer = document.getElementById("sidebar")
    dogContainer.addEventListener("click", function(event) {
        event.target.style.color = "white";
        const info = document.getElementById("dog-info")
        const pTag = document.createElement("p")
        pTag.textContent = songList[parseInt(event.target.id)].Title
        
        info.innerHTML = ""
        // <h3 class="titleinfo">${songList[parseInt(event.target.id)].Title}</h3>
        let videoSrc = `https://www.youtube-nocookie.com/embed/${songList[parseInt(event.target.id)].url.split("=")[1]}`
        var songInfo2;
        const songInfo1 = `
        <div class="infotitle">
        <h1 class="infotitle">${songList[parseInt(event.target.id)].Title}</h1>
        </div>
        
        <br>
        <a href="${songList[event.target.id].url}">${songList[parseInt(event.target.id)].url}</a>
        <br>
        <iframe width="560" height="315" src="${videoSrc}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br>`
        // Check with watch_later model
        // debugger
        songInfo2 =`<button type="button" id="watchlater" class="btn btn-dark">Watch Later</button>`
        if (allWatchLaters.length > 0)
        {   
            allWatchLaters.filter(element => 
                {
                    if ((element.user_id === 1) && (element.url == videoSrc) && (element.saved === true)) 
                    { 
                        songInfo2 =`<button type="button" id="watchlater" class="btn btn-dark">Video Saved</button>`
                    }
                })
        }
        else
        {
            songInfo2 =`<button type="button" id="watchlater" class="btn btn-dark">Watch Later</button>`
        }
        
        const songInfo3 = `<br>
        <br>`
        // <div class="btn-group">
        // <button class="buttons" id ="like">Like +</button>
        // <p id="liketext"> 0 Likes </p>
        // <button class="buttons" id="dislike">Dislike -</button>
        // </div>
        
        info.innerHTML += songInfo1
        info.innerHTML += songInfo2
        info.innerHTML += songInfo3
        // switchTitleColors()
        listenToWatchLater()
      
    })
}

function switchTitleColors() {
   
    const arr = Array.from(document.getElementById("side-bar").children)

    for (var i = 0 ; i < arr.length ; i ++)  {
       // debugger
                if(event.target.id === arr[i].nextElementSibling.firstElementChild.id) {
                    event.target.style.color = "#228DFF";
                    event.target.style.fontFamily = "Iceland"
                    event.target.style.fontSize = "30px"
                    //  debugger
                    
                } else {
                    // arr[1].style.color = "pink";
                    arr[i].nextElementSibling.firstElementChild.style.color = ""
                    arr[i].nextElementSibling.firstElementChild.style.fontFamily = ""
                    arr[i].nextElementSibling.firstElementChild.style.fontSize = ""
                }
                
      } 
 }

 function switchButtonColors() {
    const arr = Array.from(document.getElementsByTagName("BUTTON"))
    // for (var i = 0 ; i < arr.length ; i ++)  {
    //   //  debugger
    //     if(event.target.id === arr[i].id) {
    //         event.target.style.fontWeight = "bold"
    //         event.target.style.color = "black";
    //         event.target.style.fontFamily = "Iceland"
    //         event.target.style.fontSize = "30px"

    //     } else {
    //         // arr[i].nextElementSibling.style.fontWeight = ""
    //         // arr[i].nextElementSibling.style.fontFamily = ""
    //         // arr[i].nextElementSibling.style.fontSize = ""
    //         // arr[i].nextElementSibling.style.color = ""
    //     }
    // }

 }

function renderElements(list)
{
    const ulTag = document.getElementById("side-bar")
    const barTag = document.getElementById("sidebar")
     barTag.style.display = "block"
    ulTag.innerHTML = ""
    let i = 0
    const iframe = `
    <iframe src="https://ntmaker.gfto.ru/newneontexten/?image_height=200&image_width=600&image_font_shadow_width=30&image_font_size=40&image_background_color=1D1919&image_text_color=F5A1FF&image_font_shadow_color=F7406B&image_url=&image_text=Click Title Below👇&image_font_family=Nickainley&" frameborder='no' scrolling='no' width="300" height="100"></iframe>         
    `
    ulTag.innerHTML += iframe
    for (const item in list) 
    {
        
        let createLi = document.createElement("Li")
        let createA = document.createElement("a")
        createA.textContent = list[item].Title
        createA.setAttribute('id', `${i++}`)
        // createA.setAttribute("href",`${list[item].url}`)
        createA.setAttribute('onclick','showElementInfo(list)')
        createA.onclick = function() {showElementInfo(list);};
        createLi.appendChild(createA)
        ulTag.appendChild(createLi)
    } 
}

function showElementInfo(list) {
    const dogContainer = document.getElementById("sidebar")
    dogContainer.addEventListener("click", function(event) {
        
        const info = document.getElementById("dog-info")
        var eleInfo2;
        const pTag = document.createElement("p")
        pTag.textContent = list[event.target.id].Title
        info.innerHTML = ""
        //debugger
        // <h3 class="titleinfo">${list[parseInt(event.target.id)].Title}</h3>
        let videoSrc = `https://www.youtube-nocookie.com/embed/${list[event.target.id].url.split("=")[1]}`
        const eleInfo1 = `

        <div class="infotitle">
        <h1 class="infotitle">${list[parseInt(event.target.id)].Title}</h1>
        </div>
        <br>
        <a href="${list[event.target.id].url}">${list[parseInt(event.target.id)].url}</a>
        <br>
        <iframe width="560" height="315" src="${videoSrc}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br>`
        eleInfo2 =`<button type="button" id="watchlater" class="btn btn-dark">Watch Later</button>`
        if (allWatchLaters.length > 0)
        {   
            allWatchLaters.filter(element => 
                {   
                    if ((element.user_id === 1) && (element.url == videoSrc) && (element.saved === true)) 
                    { 
                        eleInfo2 =`<button type="button" id="watchlater" class="btn btn-dark">Video Saved</button>`
                    }
                })
        }
        else
        {
            eleInfo2 =`<button type="button" id="watchlater" class="btn btn-dark">Watch Later</button>`
        }
        
        const eleInfo3 = `<br>
        <br> `
    //     <div class="btn-group">
    //     <button class="buttons">Like +</button>
    //     <p id="liketext"> 0 Likes </p>
    //     <button class="buttons">Dislike -</button>
    //   </div>
        
        info.innerHTML += eleInfo1
        info.innerHTML += eleInfo2
        info.innerHTML += eleInfo3
        listenToWatchLater()
        // switchTitleColors()
    })   
    // listenToWatchLater()

}

function renderHomePage(list) {
    const info = document.getElementById("dog-info")
    info.innerHTML = ""
//<h1 class="topchoices">Top Choices</h1>
   
    const title = `<div id="container">
    <p><a href="">Top Choices</a></p>
    </div>`
    info.innerHTML += title


    list.forEach(type => { 
    
  // debugger
  const homepage = `
    <div class="box">
    <iframe width="350" height="195" src="https://www.youtube-nocookie.com/embed/${type.url.split("=")[1]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `

    info.innerHTML += homepage
})
}

function listenToWatchLater()
{
    let button = document.querySelectorAll(".btn")[5]
    button.addEventListener("click",addToWatchlater)
}

function addToWatchlater()
{
   /*extract the url,userid and pass*/
   if (event.target.textContent === "Watch Later")
   {    
        var url = event.target.previousElementSibling.previousElementSibling.src // (in string)
        var title = event.target.parentElement.firstElementChild.textContent
        var userId = 1;
        // fetch(`http://localhost:3000/users/${userId}/watch_laters`,{
        fetch(`https://youchoose-backend-rails.herokuapp.com/users/${userId}/watch_laters`,{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({
            watch_later: {url:url,user_id:userId,saved:"true",title:title}
            })
        })
        .then(result => {
            // debugger
        if (result.ok === true)
        {
            alert("Added to Watch later")
            document.querySelectorAll(".btn")[5].textContent = "Video Saved"

        }
        else
        {
            alert("Oh something happened"+result)
        }
        return result.json()
        })
        .then(data => {
            allWatchLaters.push(data)
            console.log(allWatchLaters)
        })
        .catch(error => console.log(error))
   }
   else
   {
       alert("This video is already saved.")
   }
}

function fetchWatchLater()
{
    // fetch("http://localhost:3000/only_watch_laters") https://youchoose-backend-rails.herokuapp.com/only_watch_laters
    fetch("https://youchoose-backend-rails.herokuapp.com/only_watch_laters") 
    .then(resp => resp.json())
    .then(data => { 
        allWatchLaters = data
        if (allWatchLaters.length > 0)
        {
            renderMyProfile() // call to render these
        }
 })
}

function renderMyProfile() {

    const info = document.getElementById("dog-info")
    const nav = document.getElementById("sidebar")
    nav.style.display = "none"
    const divcontainer = document.createElement("div")
    divcontainer.setAttribute("class", "divcontainer")
     const line = document.createElement("h5")
     const deletebutton = document.createElement("h5")
     line.innerHTML = "-------------------------------------"
     deletebutton.innerHTML = "To Delete video click this Button '⬜' below:"
    //  user.innerHTML = "My Profile"
     info.innerHTML = ""
     const title = `<div id="container">
     <p><a href="">My Profile</a></p>
     </div>`
     divcontainer.innerHTML += title
    
     divcontainer.appendChild(deletebutton)
     divcontainer.appendChild(line)
     info.appendChild(divcontainer)
    // info.appendChild(user)
     const createUl = document.createElement("ul")
    
     
     if (allWatchLaters.length > 0)
     {
        createUl.setAttribute("id","WatchUl")
        allWatchLaters.forEach(ele => {
            const createLi = document.createElement("li")
            createLi.setAttribute("class", "nodots")
            createLi.textContent = ele.title
            const delButton = document.createElement("Button")
            delButton.setAttribute("id",`${ele.id}`)
            createLi.appendChild(delButton)
            createUl.appendChild(createLi)
         })
         divcontainer.appendChild(createUl)
         listenForDelete();
     }
     else
     {
         let message = "There are no videos to watch later. You can add them now!!"
         divcontainer.innerHTML += message
     }
     
}

function listenForDelete()
{
    document.getElementById("WatchUl").addEventListener('click',deleteVideo);
}

function deleteVideo(event)
{   
    if (event.target.tagName == "BUTTON")
    {
        let id = parseInt(event.target.id)
        // fetch (`http://localhost:3000/only_watch_laters/${id}`,{method: "DELETE"})
        fetch (`https://youchoose-backend-rails.herokuapp.com/only_watch_laters/${id}`,{method: "DELETE"})
        .then(resp => {
            if (resp.status == 204)
            {
                alert(event.target.parentElement.textContent.split("(")[0]+" removed from your watch later queue")
                event.target.parentElement.remove()
                allWatchLaters = allWatchLaters.filter(ele => ele.id != id);
            }
            else
            {
                alert("Please try some time later due to network issues.")
            }
        })
        .catch(error => console.log(error))
    }
}


