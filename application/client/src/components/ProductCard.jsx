import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import StarIcon from '@mui/icons-material/Star';

export default function ProductCard({ props }) {
  const {
    title,
    price,
    rating,
    review_count,
    purchase_cnt_prev_month,
    store_name,
    main_category,
    original_price
  } = props;
  return (
    <Card sx={{ width: '320', maxWidth: '100%', boxShadow: 'lg', m: 1}}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{main_category}</Typography>
        <Link
          href="/recommendations"
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
        >
          {title}
        </Link>
        <Typography level="body-xs">{store_name}</Typography>
        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}

          endDecorator={
            original_price && (
              <Chip component="span" size="sm" variant="soft" color="success">
                On sale!
              </Chip>
            )
          }
        >
          ${price}
        </Typography>
        <Typography level="body-sm">
          {rating} <StarIcon sx={{color: 'gold', fontSize: '18px' }} /> ({review_count} reviews)
        </Typography>
        {purchase_cnt_prev_month != null && (
          <Typography level="body-sm">
            {purchase_cnt_prev_month} purchased in the last month
          </Typography>
        )}
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}