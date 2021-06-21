import React from 'react';
import ProfileTile from './profileTile';
import './projectTileGrid.css'

class ProfileTileGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profiles: props.profiles,
            undergraduate: false,
            filterByTags: false,
            filterBySkills: false,
            skills: [],
            tags: [],
            search_queries: [],
            lastSortOption: "0",
        }
        
        if(this.state.profiles.length === 0){
            this.getProfiles();
        }
    }

    renderTile(id, username, firstname, lastname, imageSrc, degree, degree_level, skills) {
        if (id === undefined){
            id = 1;
        }
        return <ProfileTile key={id} username={username} name={firstname + " " + lastname} imageSrc={imageSrc} degree={degree} degree_level={degree_level} skills={skills}/>;
    }

    handleUndergraduate = () =>{
        this.setState({undergraduate : !this.state.undergraduate});
    }

    handleTags = (selectedTags) => {
        this.setState({filterByTags: selectedTags.length, tags: selectedTags});
    }

    getProfiles = async () => {    
        try {
            const response = await fetch(process.env.REACT_APP_SERVER + "/users");
            const jsonData = await response.json();
    
            this.setState({profiles: jsonData})
        } catch (err) {
         console.error(err.message);
        }
    
      };

    searchForQuery = (query) => {
        this.setState({search_queries : query.toLowerCase().split(/[ ,]+/).filter(Boolean)});
    }

    handleSort = (sortOption) => {
        if (sortOption !== this.state.lastSortOption) {
            this.setState({profiles: this.state.profiles.reverse()})
        }
        this.setState({lastSortOption: sortOption});
        
    }

    handleSkills = (selectedSkills) => {
        this.setState({filterBySkills: selectedSkills.length, skills: selectedSkills});
    }
      
    render() {
        if (this.state.profiles.length === 0) {
            return <></>
        }
        return (    
            <div data-testid='profileTileGrid' className="projectTileGrid">
                {this.state.profiles
                .filter(profile => this.state.undergraduate ? profile.degree_level === "Undergraduate" : true)
                .filter(profile => this.state.filterBySkills ? 
                                        this.state.skills.some(skill => profile.skills.map(s=>s.toLowerCase()).includes(skill.value.toLowerCase())) : 
                                        true)
                .filter(profile => this.state.search_queries ? 
                                        (this.state.search_queries.every(
                                            query => profile.username.toLowerCase().includes(query)
                                            ||profile.firstname.toLowerCase().includes(query)
                                            || profile.lastname.toLowerCase().includes(query)
                                            || profile.bio.toLowerCase().includes(query) 
                                            || profile.degree.toLowerCase().includes(query)
                                            || profile.degree_level.toLowerCase().includes(query)
                                            || profile.skills.map( t => t.toLowerCase()).includes(query)) 
                                        ) : 
                                        true)
                .map(profile => this.renderTile(profile.id, profile.username, profile.firstname, profile.lastname, profile.image_filepath ,profile.degree, profile.degree_level, profile.skills))}
            </div>
        );
    }
}

export default ProfileTileGrid;