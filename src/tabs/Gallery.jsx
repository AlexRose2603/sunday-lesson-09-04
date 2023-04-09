import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isBtnVisible: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.onGetImages(query, page);
    }
  }

  async onGetImages(query, page) {
    this.setState({ isLoading: true });
    try {
      const result = await ImageService.getImages(query, page);
      console.log(result);
      this.setState(prevState => ({
        images: [...prevState.images, ...result.photos],
        isBtnVisible: true,
      }));
    } catch (error) {
      console.log('!!!!!!!!!!!!!!', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  onSubmit = value => {
    this.setState({ query: value, page: 1, images: [] });
  };
  render() {
    const { isLoading, images, isBtnVisible } = this.state;
    return (
      <>
        <SearchForm isActive onSubmit={this.onSubmit} />
        {isLoading && <p>Loading...</p>}
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
        <Grid>
          {images.map(image => {
            return (
              <GridItem>
                <CardItem>
                  <img src={image.src.medium} alt={image.alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {isBtnVisible && <Button onClick={this.onLoadMore}>Load more</Button>}
      </>
    );
  }
}
