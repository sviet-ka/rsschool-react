import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://dummyjson.com/products/123', () =>
    HttpResponse.json({
      id: 123,
      brand: 'brand1',
      category: 'category1',
      description: 'description1',
      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
      price: 1,
      rating: 1,
      title: 'title1',
    })
  ),
  http.get('https://dummyjson.com/products', () =>
    HttpResponse.json({
      products: [
        {
          id: 123,
          brand: 'brand1',
          category: 'category1',
          description: 'description1',
          images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
          price: 1,
          rating: 1,
          title: 'title1',
        },
        {
          id: 2,
          brand: 'brand2',
          category: 'category2',
          description: 'description2',
          images: ['img2'],
          price: 2,
          rating: 2,
          title: 'title2',
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    })
  ),
  http.get('https://dummyjson.com/products/search*', () =>
    HttpResponse.json({
      products: [
        {
          id: 123,
          brand: 'brand1',
          category: 'category1',
          description: 'description1',
          images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
          price: 1,
          rating: 1,
          title: 'title1',
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    })
  ),
];
