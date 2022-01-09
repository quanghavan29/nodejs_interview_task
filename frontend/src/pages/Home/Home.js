import { CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Input, Button, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewComment, deleteComment } from '../../redux/actions/CommentAction';
import { createNewPost, deletePost, getAllPostsAction } from '../../redux/actions/PostAction';
import './Home.css'

const { Option } = Select;

export default function Home() {

    const users = [
        { id: 1, username: 'SYSTEM', imageUrl: 'https://res.cloudinary.com/fpt-food/image/upload/v1639790796/ReactJS_Jira_Bugs_Clone/thor_yr3qyw.jpg' },
        { id: 2, username: 'ANONYMOUS', imageUrl: 'https://res.cloudinary.com/fpt-food/image/upload/v1639790796/ReactJS_Jira_Bugs_Clone/spiderman_zbdric.jpg' },
        { id: 3, username: 'ADMIN', imageUrl: 'https://res.cloudinary.com/fpt-food/image/upload/v1639790796/ReactJS_Jira_Bugs_Clone/captain_dqiu1d.jpg' },
        { id: 4, username: 'USER', imageUrl: 'https://res.cloudinary.com/fpt-food/image/upload/v1639790796/ReactJS_Jira_Bugs_Clone/ironman_g05or9.jpg' },
    ];

    const [state, setState] = useState({
        userLogin: { ...users[0] },
        postContent: '',
        commentContent: '',
    })

    const { posts } = useSelector(state => state.PostReducer)

    const dispatch = useDispatch();
    
    const handleChangeAccount = (value) => {
        let userLogin = users.find(user => user.id === value);
        setState({ userLogin, postContent: '', commentContent: '' })
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const onPosting = () => {
        let newPost = {
            user: { id: state.userLogin.id },
            content: state.postContent,
        }
        setState({ ...state, postContent: '' })
        dispatch(createNewPost(newPost))
    }

    const onComment = (postId) => {
        let newComment = {
            user: { id: state.userLogin.id },
            post: { id: postId },
            content: state[`commentContent${postId}`],
        }

        dispatch(createNewComment(newComment))
    }

    const onDeletePost = (postId) => {
        dispatch(deletePost(postId))
    }

    const onDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId))
    }

    useEffect(() => {
        dispatch(getAllPostsAction())
    }, [])

    return (
        <div className="row pt-5">
            <div className="col-4"></div>
            <div style={{ maxWidth: 500, margin: 'auto' }} className="col-4">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <Avatar src={state.userLogin.imageUrl} />
                    </div>
                    <div style={{ marginLeft: 10, width: 250 }}>
                        <Input placeholder="Bạn đang nghĩ gì?" value={state.postContent} name="postContent" onChange={handleChangeInput} />
                    </div>
                    <div style={{ marginLeft: 10 }} >
                        <Button type="primary" onClick={() => { onPosting() }}>
                            Đăng
                        </Button>
                    </div>
                </div >
                <br />
                <p className="text-center" style={{ fontWeight: 'bold' }}>{state.userLogin.username}</p>
                <hr />

                {posts?.map((post, index) => {
                    return (
                        <div className="bg-white mt-5" style={{ borderRadius: 8, padding: 14 }} key={index}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <div style={{ display: 'flex' }}>
                                    <div><Avatar src={post?.user?.imageUrl} /></div>
                                    <div style={{ marginLeft: 8, fontWeight: 'bold' }}>{post?.user?.login?.toUpperCase()}</div>
                                </div>
                                {state.userLogin?.id === post?.user?.id ? <DeleteOutlined className="text-right text-danger"
                                    style={{ fontSize: 20, cursor: 'pointer', marginTop: 0 }} onClick={() => { onDeletePost(post.id) }} /> : null}
                            </div>
                            <div className="mt-3 text-center mb-5">
                                <h6>{post?.content}</h6>
                            </div>

                            <div>
                                <div className="text-center" style={{ color: '#65676B', fontWeight: 'bold', cursor: 'pointer' }}>
                                    <hr style={{ marginBottom: 5 }} />
                                    <CommentOutlined style={{ fontSize: 24 }} /><span style={{ paddingTop: 10 }}> Bình luận</span>
                                    <hr style={{ marginTop: 5 }} />
                                </div>
                            </div>

                            {post?.comments?.map((comment, index) => {
                                return (
                                    <div style={{ display: 'flex', marginTop: 20 }} key={index}>
                                        <div><Avatar src={comment?.user?.imageUrl} /></div>
                                        <div>
                                            <div style={{ marginLeft: 6, backgroundColor: '#F0F2F5', paddingLeft: 8, paddingRight: 10, paddingBottom: 4, borderRadius: 10 }}>
                                                <span style={{ fontWeight: 'bold', fontSize: 12 }}>{comment?.user?.login.toUpperCase()}</span><br />
                                                {comment?.content}
                                            </div>
                                            <div style={{ marginLeft: 12, fontSize: 12, fontWeight: 'bold', color: '#787878' }}>
                                                {state.userLogin?.id === comment?.user?.id ?
                                                    <div><span style={{ cursor: 'pointer' }}>Chỉnh sửa</span> ◘ <span style={{ cursor: 'pointer' }} onClick={() => {onDeleteComment(comment.id)}}>Xoá</span></div>
                                                    : <div><span style={{ cursor: 'pointer' }}>Thích</span> ◘ <span style={{ cursor: 'pointer' }}>Phản hồi</span></div>}
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}

                            <div className="pt-4 mt-3 mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <Avatar src={state.userLogin.imageUrl} />
                                </div>
                                <div style={{ marginLeft: 10, width: 250 }}>
                                    <Input placeholder="Viết bình luận..." value={state[`commentContent${post.id}`]} name={`commentContent${post.id}`} onChange={handleChangeInput} />
                                </div>
                                <div style={{ marginLeft: 10 }} >
                                    <Button type="primary" onClick={() => { onComment(post.id) }}>
                                        OK
                                    </Button>
                                </div>
                            </div >
                        </div>
                    )
                })}
            </div>
            <div className="col-4">
                <Select defaultValue={state.userLogin.username} style={{ width: 150 }} onChange={handleChangeAccount}>
                    <Option value={1}>SYSTEM</Option>
                    <Option value={2}>ANONYMOUS</Option>
                    <Option value={3}>ADMIN</Option>
                    <Option value={4}>USER</Option>
                </Select>
            </div>
        </div>
    )
}
