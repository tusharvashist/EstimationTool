import axios from "axios";
const rows = [
    {   id: 1, 
        estimationName: 'UI Development', 
        estimationDescription: 'create login and  home page', 
        estimationType: "FED", 
        clientName:"Apple", 
        projectName:"Apple abc", 
        lastUpdateOn:"04/19/2021"
    },
    {   id: 2, 
        estimationName: 'back end  Development', 
        estimationDescription: 'create login api', 
        estimationType: "BED", 
        clientName:"Sony", 
        projectName:"Sony abc", 
        lastUpdateOn:"08/12/2021"
    },
    {   id: 3, 
        estimationName: 'back end and front end  Development', 
        estimationDescription: 'create Home page and home  api', 
        estimationType: "FED/BED", 
        clientName:"Micromax ", 
        projectName:"Micromax  abc", 
        lastUpdateOn:"09/22/2021"
    },
    {   id: 4, 
        estimationName: 'testing website', 
        estimationDescription: 'test dev website ', 
        estimationType: "QA", 
        clientName:"Karbonn ", 
        projectName:"Karbonn mobile  abc", 
        lastUpdateOn:"02/03/2021"
    },
    {   id: 5, 
        estimationName: 'Analist BA', 
        estimationDescription: 'Analist Analist regarding Lava ', 
        estimationType: "BA", 
        clientName:"Lava  ", 
        projectName:"Lava International mobile  abc", 
        lastUpdateOn:"05/06/2021"
    },
    {   id: 6, 
        estimationName: 'UI Development', 
        estimationDescription: 'create login and  home page', 
        estimationType: "FED", 
        clientName:"Xolo", 
        projectName:"Xolo abc", 
        lastUpdateOn:"04/19/2021"
    },
    {   id: 7, 
        estimationName: 'back end  Development', 
        estimationDescription: 'Intex Technologies', 
        estimationType: "BED", 
        clientName:"Intex", 
        projectName:"Intex abc", 
        lastUpdateOn:"08/12/2021"
    },
    {   id: 8, 
        estimationName: 'back end and front end  Development', 
        estimationDescription: 'create Home page and home  api', 
        estimationType: "FED/BED", 
        clientName:"I-BallMobile", 
        projectName:"I-Ball Mobile  abc", 
        lastUpdateOn:"09/22/2021"
    },
    {   id: 9, 
        estimationName: 'testing website', 
        estimationDescription: 'test dev website ', 
        estimationType: "QA", 
        clientName:"LYF ", 
        projectName:"LYF mobile  abc", 
        lastUpdateOn:"02/03/2021"
    }
    
  ];

const HomeService = {
    getData:  function(){
        axios.get("https://jsonplaceholder.typicode.com/posts").then(function(res){
             // handle success
            // console.log("this get success responce", res)
        }).catch(function(error){
                // handle error
            // console.log(error);
        })

        return rows;
    }
}
export default  HomeService;
