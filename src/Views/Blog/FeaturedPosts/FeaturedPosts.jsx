import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));

const FeaturedPosts = props => {
  const [posts, setPosts] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data: { posts } } = await axios.get('http://localhost:8000/blog/posts');
      setPosts(posts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      {
        posts && !loading
          ? _.map(posts, ({ title, content, date, id }) => (
            <Grid item key={id} xs={12} md={6}>
              <CardActionArea href={`/post/${id}`}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {!_.isEmpty(title) &&
                          title
                        }
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {!_.isEmpty(date) &&
                          new Intl.DateTimeFormat('en-EN', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                          }).format(new Date(date))
                        }
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {!_.isEmpty(content) &&
                          _.truncate(content, {
                            'length': 50,
                            'separator': ' '
                          })
                        }
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        Continue reading...
                  </Typography>
                    </CardContent>
                  </div>
                </Card>
              </CardActionArea>
            </Grid>
          ))
          : <Grid item xs={12}>
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </Grid>
      }
    </React.Fragment>
  )
}

export default FeaturedPosts;