// fetch the APIs for the top stories in Hacker News ======================
fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
.then((data) => data.json())
.then((storyIds) => {
    // get the APIs for the first 100`s top stories
    for (i = 0; i < 100; i++){
        //get DOM elements
        const tbody = document.querySelector('table tbody');
        const modalTitle = document.querySelector('#exampleModalLabel');
        const modalTBody = document.querySelector('.comments-body');

        //Create DOM elements 
        const child = document.createElement('tr');
        const childBy = document.createElement('td');
        const childScore = document.createElement('td');
        const childTitle = document.createElement('td');
        const childComment = document.createElement('td');
        const childLink = document.createElement('a');
        const button = document.createElement('button');
        
        let comments = 0;
        //fetch all the API's info based on its ID.
        fetch('https://hacker-news.firebaseio.com/v0/item/'+storyIds[i]+'.json?print=pretty')
        .then((data) =>  data.json())
        .then((storyInfo) => {

        //DOM mods to HTML.
        parent.className = 'parent';
        child.className = 'child';
        childBy.className = 'child';
        childBy.innerText = 'By: ' + storyInfo.by;
        childScore.className = 'child';
        childScore.innerText ='Score:' + storyInfo.score;
        childLink.href = storyInfo.url;
        childLink.innerText = storyInfo.title;
        childComment.className = 'child';

        //If statement to avoid getting NaN or undefined.
        if(Number.isInteger(storyInfo.descendants)){
            comments += storyInfo.descendants;
        }
        childComment.innerText = 'Comments: ' + comments;

    //ON click eventListener to pop up my Modal element with all the comments made in the post.
    button.addEventListener('click',(e) =>{
        //get which button ID was clicked 
        fetch('https://hacker-news.firebaseio.com/v0/item/'+button.id+'.json?print=pretty')
        .then((data) =>  data.json())
        .then((viewComments) => {
            modalTitle.innerText = viewComments.title;
            //Loop through all the the index inside the comments array's based on its ID.
            for(x=0; x< viewComments.kids.length; x++){
                fetch('https://hacker-news.firebaseio.com/v0/item/'+viewComments.kids[x]+'.json?print=pretty')
                .then((data) =>  data.json())
                .then((viewCommentsKidsId) =>{
                //Create DOM elements
                const commentsTr = document.createElement('div');
                const commentsByTd = document.createElement('div');
                const commentsTextTd = document.createElement('div');
                //set my new DIV innerHtml
                commentsByTd.innerHTML = 'By: ' + viewCommentsKidsId.by;
                commentsTextTd.innerHTML = viewCommentsKidsId.text;
                //set my new DIV classNames to match with my bootstrap options
                commentsTr.className = 'comment';
                commentsByTd.className = 'comment-by';
                //append my Div's to my TBody.
                commentsTr.appendChild(commentsTextTd);
                commentsTr.appendChild(commentsByTd);
                modalTBody.appendChild(commentsTr);
                });
            }
        });

        //Bootstrap 
        let myModal = new bootstrap.Modal(document.querySelector('#exampleModal'), {
            keyboard: false
        });
        myModal.show();
    });
    //create new a Button element 
    const newTd= document.createElement('td');
    newTd.appendChild(button);
    //changed button innerText and add a class to match with bootstrap.
    button.innerText = 'View Comments';
    button.className = 'btn btn-primary';
    button.id = storyInfo.id;
    //Append all the created DOM elements to my HTML table.
    childTitle.appendChild(childLink);
    child.appendChild(childTitle);
    child.appendChild(childScore);
    child.appendChild(childBy);
    child.appendChild(childComment);
    child.appendChild(newTd);
    tbody.appendChild(child);
    });
    }
});
