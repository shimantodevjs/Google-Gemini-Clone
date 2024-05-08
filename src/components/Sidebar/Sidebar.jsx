import React, { useState,useEffect, useContext } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [showNewChat, setShowNewChat] = useState(false);
    const {onSent,prevPromt,setRecentPromt,newChat}= useContext(Context)

    const loadPrompt = async(prompt)=>{
        setRecentPromt(prompt)
        await onSent(prompt)
    }

    useEffect(() => {
    if (extended) {
        setTimeout(() => {
            setShowNewChat(true);
        }, 200);
    } else {
        setShowNewChat(false);
    }
    }, [extended]);

    const toggleMenu = () => {
        setExtended(!extended);
    };

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <img className='menu' src={assets.menu_icon} alt="" onClick={toggleMenu} />
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {showNewChat && <p>New Chat</p>}
                </div>
                {showNewChat && (
                    <div className="recent">
                        <p className='recent-title'>recent</p>
                        {prevPromt.map((item,index)=>{
                            return(
                                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,15)} ...</p>
                        </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {showNewChat && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {showNewChat && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {showNewChat && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

