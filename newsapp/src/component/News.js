import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
  country: 'us',
  pageSize: 8,
  category: 'general',
  }
  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  capatalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
    
   
  constructor(props){
    super(props);
   this.state= {
    articles: [],
    loading: false,
    page:1,
    
   }
   document.title= `${this.capatalizeFirstLetter(this.props.category)}-NewsMonkey`;
    
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a3887aaaeec431a89fbeb57b5d75bf7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData = await data.json()
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults, loading:false}) 




  }
  async componentDidMount(){
    
   
  //  let url=`https://newsapi.org/v2/top-headlines?sources=${this.props.sources}&category=${this.props.category}&apiKey=031a344342ab4245881f012d37934ce2&page=1&pageSize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a3887aaaeec431a89fbeb57b5d75bf7&page1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData = await data.json()
    // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults, loading:false})
    this.updateNews(); 
  }

  handlePrevClick=async()=>{
      

   // 
    // let url=`https://newsapi.org/v2/top-headlines?sources=${this.props.sources}&category=${this.props.category}&apiKey=031a344342ab4245881f012d37934ce2&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a3887aaaeec431a89fbeb57b5d75bf7&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //   page:this.state.page -1,
    //   articles:parsedData.articles,
    //   loading:false
  
    // })
    this.setState({page:this.state.page -1});
    this.updateNews();

  }

  handleNextClick=async()=>{
    if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

 // 
//  let url=`https://newsapi.org/v2/top-headlines?sources=${this.props.sources}&category=${this.props.category}&apiKey=031a344342ab4245881f012d37934ce2&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a3887aaaeec431a89fbeb57b5d75bf7&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true})
  // let data=await fetch(url);
  // let parsedData = await data.json()
  // this.setState({
  //   page:this.state.page +1,
  //   articles:parsedData.articles,
  //   loading:false
  // })
      this.setState({page:this.state.page +1});
      this.updateNews();
  } 

  

  }
  
  

  render(){
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'40px 0px'}}>NewsMonkey-Top {this.capatalizeFirstLetter(this.props.category)} Headlines</h1>
       {this.state.loading && <Spinner/>}

       

        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{ 
        
  return <div className="col-lg-4 col-md-6 col-sm-12"key={element.url}>
  <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
  </div>
          
        })}
        
        </div>
       
        
      <div className="container d-flex justify-content-between">
<button disabled={this.state.page<=1}  type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr;Previous</button>
<button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
</div>
    </div>
    )
  }


}export default News;
