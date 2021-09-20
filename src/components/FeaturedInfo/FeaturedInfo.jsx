import React from 'react'
import "./featuredInfo.css";
import {GroupOutlined,ArchiveOutlined,HourglassEmptyOutlined,InboxOutlined,TimerOffOutlined,VerifiedUserOutlined,Storage,StorageRounded,FolderOutlined ,PeopleOutline,LineStyle,Tune} from '@material-ui/icons';
export default function FeaturedInfo() {
    return (
        <div className="featured align-items-center text-center row">
            <div className="row">
            <div className=" nanani   ">
                <div className="featuredItem bg-white row ">
                     <div className="featuredIcon col-12 col-md-4"><FolderOutlined style={{ fontSize: 40, color : "#2d8bb4" }}/> </div>
                <div className="featuredContainer col-md-8 text-center">
                    <div className="featuredNumber">280</div>
                    Dossiers total

                </div>
                </div>
               
            </div>
            <div className=" nanani  ">
            <div className="featuredItem bg-white ss  row">
                <div className="featuredIcon col-md-4 col-12"> <GroupOutlined style={{ fontSize: 40, color:"#fff07b" }} /></div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">25</div>
                    Utilisateurs

                </div>
            </div>
            </div>
            <div className=" nanani  ">
            <div className="featuredItem bg-white ng   row">
                <div className="featuredIcon col-md-4 col-12"><HourglassEmptyOutlined style={{ fontSize: 40, color:" #ff9c9c" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">18</div>
                    Dossiers en approbation

                </div>
            </div>
            </div>
            </div>
           <div className="row">
           <div className=" nanani  ">
            <div className="featuredItem bg-white r  row">
                <div className="featuredIcon col-md-4 col-12"><ArchiveOutlined style={{ fontSize: 40, color:"#7de5ff" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">46</div>
                    Dossiers Archivés

                </div>
            </div>
            </div>
            <div className=" nanani  ">
                <div className="featuredItem bg-white    row ">
                     <div className="featuredIcon col-md-4 col-12"><TimerOffOutlined style={{ fontSize: 40, color:"#ff9cf3" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">90</div>
                    Dossiers en retard

                </div>
                </div>
               
            </div>
            <div className=" nanani  ">
            <div className="featuredItem bg-white ss  row">
                <div className="featuredIcon  col-12 col-md-4"><VerifiedUserOutlined style={{ fontSize: 40, color:"#9cffa4" }}/> </div>
                <div className="featuredContainer col-12 col-md-8 text-center">
                    <div className="featuredNumber">176</div>
                    Dossiers en réalisation

                </div>
            </div>
            </div>
           </div>
           
        </div>
    )
}
