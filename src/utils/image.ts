export const getImageUrl = (coverImage: string | undefined): string => {
    if (!coverImage) return '/default-book-cover.png';
    if (coverImage.startsWith('http')) return coverImage;
    return `http://localhost:4000${coverImage}`;
  };
  