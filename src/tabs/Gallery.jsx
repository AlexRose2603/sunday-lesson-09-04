import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

import { useEffect, useState } from 'react';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(() => {
    if (query !== '') {
      onGetImages(query, page);
    }
  }, [query, page]);

  async function onGetImages(query, page) {
    setIsLoading(true);

    try {
      const result = await ImageService.getImages(query, page);
      console.log(result);
      setImages(prevState => {
        return [...prevState, ...result.photos];
      });
      setIsBtnVisible(true);
    } catch (error) {
      console.log('!!!!!!!!!!!!!!', error);
    } finally {
      setIsLoading(false);
    }
  }
  const onLoadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };
  const onSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  return (
    <>
      <SearchForm isActive onSubmit={onSubmit} />
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
      {isBtnVisible && <Button onClick={onLoadMore}>Load more</Button>}
    </>
  );
};

// export class Gallery extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoading: false,
//     isBtnVisible: false,
//   };

// componentDidUpdate(_, prevState) {
//   const { query, page } = this.state;
//   if (prevState.query !== query || prevState.page !== page) {
//     this.onGetImages(query, page);
//   }
// }

// async onGetImages(query, page) {
//   this.setState({ isLoading: true });
//   try {
//     const result = await ImageService.getImages(query, page);
//     console.log(result);
//     this.setState(prevState => ({
//       images: [...prevState.images, ...result.photos],
//       isBtnVisible: true,
//     }));
//   } catch (error) {
//     console.log('!!!!!!!!!!!!!!', error);
//   } finally {
//     this.setState({ isLoading: false });
//   }
// }
// onLoadMore = () => {
//   this.setState(prevState => {
//     return {
//       page: prevState.page + 1,
//     };
//   });
// };
// onSubmit = value => {
//   this.setState({ query: value, page: 1, images: [] });
// };

// const { isLoading, images, isBtnVisible } = this.state;
// return (
//   <>
//     <SearchForm isActive onSubmit={this.onSubmit} />
//     {isLoading && <p>Loading...</p>}
//     {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
//     <Grid>
//       {images.map(image => {
//         return (
//           <GridItem>
//             <CardItem>
//               <img src={image.src.medium} alt={image.alt} />
//             </CardItem>
//           </GridItem>
//         );
//       })}
//     </Grid>
//     {isBtnVisible && <Button onClick={this.onLoadMore}>Load more</Button>}
//   </>
// );
