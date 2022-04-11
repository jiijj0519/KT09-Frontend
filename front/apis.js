// 유저 정보 불러오기
function getUser(userId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/users/${userId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('user:', result);
		},
		error: function () {
			alert('유저 정보 로드 실패');
		},
	});
	return result;
}
// 게시글 추가
function addPost(data) {
	$.ajax({
		type: 'post',
		url: 'http://localhost:3000/posts',
		contentType: 'application/json',
		traditional: true,
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('업로드 성공');
			// alert('업로드 성공');
		},
	});
}
// 모든 게시글 불러오기
function getAllPosts(category) {
	var result;
	var getUrl = category
		? `http://localhost:3000/posts?category=${category}`
		: 'http://localhost:3000/posts';
	console.log(category);
	$.ajax({
		type: 'get',
		url: getUrl,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('posts:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 게시글 삭제
function deletePost(postId) {
	$.ajax({
		type: 'delete',
		url: `http://localhost:3000/posts/${postId}`,
		async: false,
		success: function (data) {
			console.log('삭제:', data);
		},
		error: function () {
			alert('게시글 삭제 실패');
		},
	});
}
// 게시글 정보 불러오기
function getPost(postId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/posts/${postId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('post:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 댓글 리스트 불러오기
function getComments(postId) {
	var comments;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/comments?postId=${postId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			comments = data;
			console.log('comments:', data);
		},
		error: function () {
			alert('댓글 로드 실패');
		},
	});
	return comments;
}

// 댓글 업로드
function postComment(data) {
	$.ajax({
		type: 'post',
		url: `http://localhost:3000/comments?postId=${data.postId}`,
		contentType: 'application/json',
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('업로드 성공');
		},
		error: function () {
			alert('댓글 업로드 실패');
		},
	});
}

// 게시글 좋아요 추가
function addLike(postId, like) {
	var data = { like: like };
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/posts/${postId}`,
		contentType: 'application/json',
		data: JSON.stringify(data),
		async: false,
		success: function (data) {
			console.log('좋아요 업데이트 성공');
		},
		error: function () {
			alert('좋아요 업데이트 실패');
		},
	});
}

// 해결 완료로 바꾸기
function addSolved(postId) {
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/posts/${postId}`,
		contentType: 'application/json',
		data: JSON.stringify({ solved: true }),
		async: false,
		success: function (data) {
			console.log('해결 완료 업데이트 성공');
		},
		error: function () {
			alert('해결 완료 업데이트 실패');
		},
	});
}

// 해쉬태그 검색
function searchByHashtag(hashtag) {
	var posts = getAllPosts();
	var result;

	result = posts.filter((post) => {
		return post.hashtags.includes('#' + hashtag);
	});
	console.log(result);
	return result;
}

// 일반 검색
function searchByWord(word) {
	var posts = getAllPosts();
	var result;
	result = posts.filter((post) => {
		return post.title.includes(word) || post.content.includes(word);
	});
	console.log(result);
	return result;
}

// 특정 유저 게시글 불러오기
function getUserPost(userId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/posts?userId=${userId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('post:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 특정 유저 댓글 불러오기
function getUserComment(userId) {
	var result;
	$.ajax({
		type: 'get',
		url: `http://localhost:3000/comments?userId=${userId}`,
		contentType: 'application/json',
		async: false,
		success: function (data) {
			result = data;
			console.log('comments:', result);
		},
		error: function () {
			alert('실패');
		},
	});
	return result;
}

// 해쉬태그 추가
function addHashtag(userId, hashtag) {
	var user = getUser(userId);
	var hashtags = [...user.hashtags, '#' + hashtag];
	$.ajax({
		type: 'patch',
		url: `http://localhost:3000/users/${userId}`,
		contentType: 'application/json',
		data: JSON.stringify({ hashtags: hashtags }),
		async: false,
		success: function (data) {
			console.log('해쉬태그 업데이트 성공');
		},
		error: function () {
			alert('해쉬태그 업데이트 실패');
		},
	});
}
