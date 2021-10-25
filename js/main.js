// ============= HTML ELEMENTS ============
const elUserListWrapper = $_(".users-list");
const elPostListWrapper = $_(".users-post-list");
const elCommentsWrapper = $_(".users-comment-post")
// ===
const elUsersTemlate = $_("#users-template").content;
const elPostTemlate = $_("#post-tempalte").content;
const elCommentTempalte = $_("#comments-template").content;
// ===
const fragment = document.createDocumentFragment();
const fragmentPost = document.createDocumentFragment();
const fragmentComment = document.createDocumentFragment();

// ========= SITE API ========
const APIURL = "https://jsonplaceholder.typicode.com";
// ============ FUNCTION USERS ITEM ===========================================
fetch(`${APIURL}/users`)
  .then((response) => response.json())
  .then((data) => {
    users(data);

    // ==== RENDER USERS ITEM =====
    function users(arr) {
      arr.forEach(element => {
        fragment.appendChild(renderUsers(element));
      });
      elUserListWrapper.appendChild(fragment)
    }
  });

// ====== CREATED ELEMENTS TO USERS ITEM ========
let renderUsers = function (user) {
  let newUser = elUsersTemlate.cloneNode(true);

  $_(".name", newUser).textContent = user.name;
  $_(".user__name", newUser).textContent = user.username;
  $_(".user__email", newUser).textContent = user.email;
  $_(".user__email", newUser).href = `mailto:${user.email}`
  $_(".user__address", newUser).textContent = `${user.address.street} ${user.address.suite} ${user.address.city}`
  $_(".user__btn", newUser).setAttribute("data-id", `${user.id}`);

  return newUser
}


// ========== FUNCTION USERS POST ITEM =======================================
function postFunction(id) {
  fetch(`${APIURL}/posts`)
    .then((response) => response.json())
    .then((data) => {
      posts(data);

      // ==== RENDER USERS ITEM =====
      function posts(arr) {
        let postApi = arr.filter((el) => el.userId == id);
        postApi.forEach(element => {
          fragmentPost.appendChild(renderPosts(element));
        });
        elPostListWrapper.appendChild(fragmentPost)
      }
    });

  // ====== CREATED ELEMENTS TO POST ITEM ========
  let renderPosts = function (post) {
    let newPost = elPostTemlate.cloneNode(true);

    $_(".post__item-title", newPost).textContent = post.title;
    $_(".post__item-text", newPost).textContent = post.body;
    $_(".post__btn", newPost).setAttribute("data-id", `${post.id}`);

    return newPost
  }
}

elUserListWrapper.addEventListener('click', function (e) {
  elPostListWrapper.innerHTML = "";
  let id = e.target.dataset.id;
  postFunction(id);
});


// ========= FUNCTION COMMENTS ITEM ================================================
function commentsFunction(id) {
  fetch(`${APIURL}/comments`)
    .then((response) => response.json())
    .then((data) => {
      comments(data)

      function comments(arr) {
        let comApi = arr.filter((el) => el.postId == id)
        comApi.forEach((element) => {
          fragmentComment.appendChild(commentPost(element))
          console.log(element);
        })
        elCommentsWrapper.appendChild(fragmentComment);
      }
    });

  // ============= CREATED ELEMENTS TO COMMENTS ITEM ============
  let commentPost = function (comment) {
    console.log(comment);
    let newComment = elCommentTempalte.cloneNode(true);

    $_(".comment__title", newComment).textContent = comment.name
    $_(".comment__link", newComment).textContent = comment.email
    $_(".comment__link", newComment).href = `mailto:${comment.email}`
    $_(".comment__text", newComment).textContent = comment.body

    return newComment;
  }
}

elPostListWrapper.addEventListener("click", function (e) {
  elCommentsWrapper.innerHTML = "";
  let postId = e.target.dataset.id;
  commentsFunction(postId);
});

