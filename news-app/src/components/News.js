import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {
  articles = [
    {
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": "Stephan Shemilt",
      "title": "Eight-hundred-and-twenty-three! The spirit behind England's record-breaking day",
      "description": "England's record-breaking runscoring is testament to their incredible spirit, says chief cricket writer Stephan Shemilt",
      "url": "https://www.bbc.com/sport/cricket/articles/c93p72xk13do",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/4433/live/48c70cd0-872c-11ef-9d67-ad008e023ea5.jpg",
      "publishedAt": "2024-10-10T18:09:03Z",
      "content": "For Brook, who admitted he was merely trying to beat his father David's highest score of 210, it was also testament to a fitness regime implemented when he missed England's tour of India earlier this… [+2200 chars]"
    },

    {
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": null,
      "title": "Man arrested over burglary at Ben Stokes's home",
      "description": "A man is arrested following a burglary at England cricket captain Ben Stokes's home, police said.",
      "url": "https://www.bbc.com/news/articles/c3e8407lkv3o",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/0f2c/live/60f697b0-1203-11ef-82e8-cd354766a224.png",
      "publishedAt": "2024-11-01T14:44:51Z",
      "content": "A man has been arrested following a burglary at England cricket captain Ben Stokes's home, police have said. \r\nStokes, who was in Pakistan for the recent Test series, said his wife and two children w… [+320 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": "Matthew Henry",
      "title": "Warner's leadership ban lifted by Cricket Australia",
      "description": "David Warner's lifetime leadership ban is lifted by Cricket Australia, leaving him free to captain in domestic cricket.",
      "url": "https://www.bbc.com/sport/cricket/articles/c2e7krwnp11o",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/5885/live/90b5c700-9291-11ef-81d1-4f5706f00b57.jpg",
      "publishedAt": "2024-10-25T05:31:33Z",
      "content": "Meanwhile, Australia skipper Pat Cummins appeared to rule out Warner reversing his Test retirement to fill the side's vacant opener position against India in the upcoming series.\r\nWarner has offered … [+572 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": "BBC Sport",
      "title": "Sri Lanka's Jayawickrama handed one-year ban",
      "description": "Sri Lanka spinner Praveen Jayawickrama handed a one-year ban from all forms of cricket for breaching the anti-corruption code, the International Cricket Council (ICC) said.",
      "url": "https://www.bbc.com/sport/cricket/articles/ckgnkyk20pgo",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/cdbf/live/780b4920-815a-11ef-a217-b780a227dde7.jpg",
      "publishedAt": "2024-10-03T08:08:54Z",
      "content": "Sri Lanka spinner Praveen Jayawickrama has been handed a one-year ban from all forms of cricket for breaching the anti-corruption code.\r\nJayawickrama was charged with three breaches of the code by th… [+810 chars]"
    }
  ]
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      category: "Keyword",
      page : 1,
      totalPage:"",
    }
  }
  async componentDidMount() {
    await this.fetchArticles(this.state.category);
  }
  //api fetching function 
  fetchArticles = async (category) => {
    console.log(this.state);
    const url = `https://newsapi.org/v2/everything?q=${category}&language=en&sortBy=popularity&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=ff5b872e799442d695232b57cf0dcbd6`;
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json.articles)
      this.setState({ articles: json.articles,
                totalPage:json.totalResults,
       });
    } catch (error) {
      console.log(error);
    }
  };  
// change catagory funtion
  handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    this.setState({ category: selectedCategory,
                    page:1,

     }, () => {
      this.fetchArticles(selectedCategory); // Fetch articles with the new category
    });
  };
  handleNextChange = async () => {
    this.setState({ 
        page: this.state.page+1
      }, () => {
      this.fetchArticles(this.state.category); // Fetch articles with the new category
    });
   
  };
  handlePrevChange = async () => {
    this.setState({ 
        page: this.state.page-1,
     }, () => {
      this.fetchArticles(this.state.category); // Fetch articles with the new category
    });
  };
  


  render() {

    return (
      <div className='container my-3 mx-auto'>
        <h2>Top Headlines</h2>
        <select
          onChange={this.handleCategoryChange}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="Keyword">Keyword</option>
          <option>cricket</option>
          <option>bitcons</option>
          <option>gold</option>
          <option>medical</option>
          <option>business</option>
          <option>education</option>
          <option>commerce</option>
        </select>
        <div className="container d-flex justify-content-between my-2">
        <button onClick={this.handlePrevChange} disabled={this.state.page<=1?true:false} type="button" className="btn btn-dark">&larr; Prev</button>
        <button onClick={this.handleNextChange} disabled={this.state.page +1 > Math.ceil(this.state.totalPage/this.props.pageSize)} type="button" className="btn btn-dark">Next &rarr;</button>
        </div>
        <div className="row">
          {this.state.articles.map((element) => {
            if (element.title !== "[Removed]") {
              return (
                <div className="col-md-3 my-3" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) + "..." : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg"} newsUrl={element.url} />
                </div>
              )
            }
            else {
              return (<></>);
            }
          })}
        </div>
      </div>
    )
  }
}