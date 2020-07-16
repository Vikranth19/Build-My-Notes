console.log('heyy project 1');
showNotes();
//if user adds a note, add it to the local storage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');
    if(addTxt.value.length===0 || addTitle.value.length===0){
        alert(`can't be empty!!, Please add a valid title and note`);
        showNotes();
    }
    else{
    let notes = localStorage.getItem('notes');      //null initially, 'notes' is like an key
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);  //converting notes string to an array(object)
    }
    let myObj={
        title: addTitle.value,
        text:addTxt.value,
        fav:false
    };   
    notesObj.push(myObj);  //pushing notes into object , now notesObj is an array of objects
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    console.log(notesObj);
    showNotes();
  }
})

//FUNCTION TO SHOW ELEMENTS FROM LOCAL STORAGE
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);    //same as above
    }
    let html = "";
    notesObj.forEach((element, index) => {
        if(element.fav===false){
            html += `
            <div class="noteCard my-2 mx-4 card" style="width: 18rem;">
            <div class="card-body">
                <i id='a${index}' class="fa fa-star fa-2x" onclick="addFav('${index}')" aria-hidden="true"></i>
                <br></br>
                <h5 class="card-title noteTitle">${index+1}.${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id='${index}' onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                <p></p>
            </div>
            </div>
                `;
        }
        else{
            html += `
            <div class="noteCard my-2 mx-4 card" style="width: 18rem;">
            <div class="card-body">
                <i id='a${index}' class="fa fa-star fa-2x backColor" onclick="addFav('${index}')" aria-hidden="true"></i>
                <br></br>
                <h5 class="card-title noteTitle">${index+1}.${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id='${index}' onclick="deleteNote(this.id)" class="btn btn-primary delBtn">Delete Note</button>
                <p></p>
            </div>
            </div>
                `;
        }
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show right Now, use 'ADD A NOTE' section above to add notes`
    }
}

//-----2)for adding favourite,  just testing
function addFav(index){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);    //same as above
    }
    document.getElementById(`a${index}`).style.cursor='pointer';
    console.log(notesObj[index].fav);
    if(notesObj[index].fav===false){
        notesObj[index].fav=true;
        console.log(document.getElementById(`a${index}`));
        // document.getElementById(`a${index}`).classList.add('backColor');
        document.getElementById(`a${index}`).className+=' backColor';
    }
    else{
        notesObj[index].fav=false;
        console.log(document.getElementById(`a${index}`));
        document.getElementById(`a${index}`).classList.remove('backColor');
    }
    localStorage.setItem('notes',JSON.stringify(notesObj));
}

//-----1)for adding favourite,  just testing
// function addFav(index){
//     if( typeof addFav.counter == 'undefined') {
//         addFav.counter= 0;
//     }
//     addFav.counter++;
//     let favBtn=document.getElementsByTagName('i')[index];
//     if(addFav.counter%2!=0){
//         favBtn.className+=' backColor';
//     }
//     else{
//        favBtn.classList.remove('backColor');
//     }
//   }

// FUNCTION TO DELETE A NOTE
function deleteNote(index) {    //index of array which we want to delete
    // console.log(`I'm getting deleted lol`, index);
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);    //same as above
    }
    notesObj.splice(index,1);    //(start index, no. of items to delete), but we have not updated local storage
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();   //we need to view again after deleting
}

//SEARCHING NOTES
let search=document.getElementById('searchTxt');
search.addEventListener('input',()=>{
     let inputVal=search.value.toLowerCase();
     console.log('search event triggered',inputVal);

     let noteCards=document.getElementsByClassName('noteCard');
     Array.from(noteCards).forEach(function(e){
         let cardTxt=e.getElementsByTagName('p')[0].innerText;   //inside each card there is only one 'p', line no.37
        //  console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            e.style.display='block';
        }
        else{
            e.style.display='none';
        }
     })
});

/*FURTHER FEATURES I WANT TO ADD:
1.Add title for a note \/
2.Mark note as important 
3.separate notes by user
4.Sync and host to a web server
*/