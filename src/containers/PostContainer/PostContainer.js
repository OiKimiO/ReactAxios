import React, {Component} from 'react';
import {PostWrapper, Navigate, Post, Warning} from '../../components';
import * as service from '../../services/post';


class PostContainer extends Component {
    constructor(props){
        super();
        //initializes component state
        this.state = {
            postId : 1,
            fetching : false, // tells whether the reqeust is wating for response or not
            post : {
                title : null,
                body  : null
            },
            comments : [],
            warningVisibility : false
        };
    }
    
    showWarning = () =>{
        
        this.setState({
            warningVisibility : true
        });
        
        setTimeout(
            () => {
                this.setState({
                    warningVisibility : false
                });
            }, 1500
        )
    }

    componentDidMount(){
        this.fetchPostInfo(1);
    }
    
    fetchPostInfo = async (postId) => {
        this.setState({
            fetching : true // reqeusting..
        })

        /*
          await 키워드로 Promise 를 기다린다 
          함수앞에 async 키워드를 붙여준다
          에러 처리는 try-catch 로 한다
          async 함수의 반환값은 Promise 형태이다

          비동기요청
          const post = await service.getPost(postId);
          console.log(post);
          const comments = await service.getComments(postId);
          console.log(comments);
        */
       /*동기 요청 */
       // wait for two promises
        try{
            const info = await Promise.all([
                service.getPost(postId),
                service.getComments(postId)
            ]);
    
            console.log(info); // info의 정보를 확인      
    
            const {title, body} = info[0].data;
    
            const comments = info[1].data;
        
            this.setState({
                postId,
                post:{
                    title,
                    body
                },
                comments,
                fetching : false //done!
            })
        } catch(e){
            this.setState({
                fetching : false
            });
            this.showWarning();
            console.log('error occured',e);
        }
        
    }

    handleNavigateClick = (type) =>{
        const postId = this.state.postId;

        if(type === 'NEXT'){
            this.fetchPostInfo(postId + 1);
        }else{
            this.fetchPostInfo(postId - 1);
        }
    }

    render() {
        const {postId, fetching, post, comments, warningVisibility} = this.state;

        return(
            <PostWrapper>
                <Navigate 
                    onClick  = {this.handleNavigateClick}
                    postId   = {postId}
                    disabled = {fetching}                    
                />
                <Post 
                    title={post.title}
                    body = {post.body}
                    comments = {comments}
                />
                <Warning 
                    message="!!잘못된 접근!!"
                    warningVisibility = {warningVisibility}
                />
            </PostWrapper>
        )
    }

}

export default PostContainer;