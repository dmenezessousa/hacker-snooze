
fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
.then((data) => data.json())
.then((storyIds) => {
    for (i = 0; i < 100; i++){
        const body = document.querySelector('table tbody');
        const child = document.createElement('tr');
        const childBy = document.createElement('td');
        const childScore = document.createElement('td');
        const childTitle = document.createElement('td');
        const childComment = document.createElement('td');
        const childLink = document.createElement('a');
        const button = document.createElement('button');
        const modalTitle = document.querySelector('#exampleModalLabel');
        const modalTBody = document.querySelector('.comments-body');
        
        let comments = 0;
        fetch('https://hacker-news.firebaseio.com/v0/item/'+storyIds[i]+'.json?print=pretty')
        .then((data) =>  data.json())
        .then((storyInfo) => {

        parent.className = 'parent';
        child.className = 'child';
        childBy.className = 'child';
        childBy.innerText = 'By: ' + storyInfo.by;
        childScore.className = 'child';
        childScore.innerText ='Score:' + storyInfo.score;
        childLink.href = storyInfo.url;
        childLink.innerText = storyInfo.title;
        childComment.className = 'child';

        if(Number.isInteger(storyInfo.descendants)){
            comments += storyInfo.descendants;
        }
        childComment.innerText = 'Comments: ' + comments;

    button.addEventListener('click',(e) =>{
        
        fetch('https://hacker-news.firebaseio.com/v0/item/'+button.id+'.json?print=pretty')
        .then((data) =>  data.json())
        .then((viewComments) => {
            modalTitle.innerText = viewComments.title;
            for(x=0; x< viewComments.kids.length; x++){
                fetch('https://hacker-news.firebaseio.com/v0/item/'+viewComments.kids[x]+'.json?print=pretty')
                .then((data) =>  data.json())
                .then((viewCommentsKidsId) =>{
                const commentsTr = document.createElement('div');
                const commentsByTd = document.createElement('div');
                const commentsTextTd = document.createElement('div');
                commentsByTd.innerHTML = 'By: ' + viewCommentsKidsId.by;
                commentsTextTd.innerHTML = viewCommentsKidsId.text;
            
                commentsTr.className = 'comment';
                commentsByTd.className = 'comment-by';

                commentsTr.appendChild(commentsTextTd);
                commentsTr.appendChild(commentsByTd);
                modalTBody.appendChild(commentsTr);


                });
            }
        });

        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
            keyboard: false
        });
        myModal.show();
    });

    const newTd= document.createElement('td');
    newTd.appendChild(button);
    button.innerText = 'View Comments';
    button.className = 'btn btn-primary';
    button.id = storyInfo.id;

    childTitle.appendChild(childLink);
    child.appendChild(childTitle);
    child.appendChild(childScore);
    child.appendChild(childBy);
    child.appendChild(childComment);
    child.appendChild(newTd);
    body.appendChild(child);
    });

}
});
