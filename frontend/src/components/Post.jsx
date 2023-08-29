import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { Link } from 'react-router-dom';
import { getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';
//to display single post content

function Post({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePost }) {

  const userContextData=useContext(userContext)
  const [user,setUser]=useState(null)
  const [login,setLogin]=useState(null)
  useEffect(()=>{
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  },[])
  return (


    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h3>{post.title}</h3>
            <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 70) + "...." }}>

            </CardText>

            <div>
                <Link className='btn btn-secondary border-0' to={'/posts/' + post.postId}>Read More</Link>
                {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={(event) => deletePost(post)} color='danger' className="ms-2">Delete</Button> : '')}
                {userContextData.user.login && (user && user.id == post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.postId}`} color='warning' className='ms-2'>Update</Button>: '' )}
            </div>
        </CardBody>
    </Card>

)
}



/* function Post({ post }) {
    const { postId,title = "This is default post title", content = "This is default post content" } = post;
    const truncatedContent = content.substring(0, 20);
  
    return (
      <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
          <h1>{title}</h1>
          <CardText>
            {truncatedContent}...
          </CardText>
          <div>
            <Link className='btn btn-secondary border-0' to={'/posts/'+postId}>Read More</Link>
          </div>
        </CardBody>
      </Card>
    );
  }
   */
  export default Post;
  
  
  
  
  
  