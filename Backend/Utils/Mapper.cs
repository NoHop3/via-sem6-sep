using Backend.DTOs;
using Backend.Models;

namespace Backend.Utils;
public static class Mapper
{
    public static User MapUserFromDTO(UserDTO userDTO)
    {
        var user = new User()
        {
            Id = userDTO.Id,
            Email = userDTO.Email,
            Username = userDTO.Username,
            FirstName = userDTO.FirstName,
            LastName = userDTO.LastName,
            BirthYear = userDTO.BirthYear,
            HashedPasword = userDTO.Password,
            //APIKey = userDTO.APIKey
        };
        //user.HashedPasword = AuthorizationProvider.HashPasword(userDTO.Password, user.Salt);
        return user;
    }

    public static UserDTO MapUserToDTO(User user)
    {
        var userDTO = new UserDTO()
        {
            Id = user.Id,
            Email = user.Email,
            Username = user.Username,
            FirstName = user.FirstName,
            LastName = user.LastName,
            BirthYear = user.BirthYear,
            APIKey = user.APIKey
        };

        return userDTO;
    }

    public static Favourite MapFavouriteMoviteFromDTO(FavouriteDTO favouriteDTO)
    {
        var favourite = new Favourite()
        {
            Id = favouriteDTO.Id,
            UserId = favouriteDTO.Id,
            MovieId = favouriteDTO.MovieId
        };

        return favourite;
    }

    public static FavouriteDTO MapFavouriteMoviteToDTO(Favourite favourite)
    {
        var favouriteDTO = new FavouriteDTO()
        {
            Id = favourite.Id,
            UserId = favourite.UserId,
            MovieId = favourite.MovieId
        };

        return favouriteDTO;
    }

    public static Review MapReviewFromDTO(ReviewDTO reviewDTO)
    {
        var review = new Review()
        {
            Id = reviewDTO.Id,
            UserId = reviewDTO.UserId,
            Username = reviewDTO.Username,
            MovieId = reviewDTO.MovieId,
            ReviewText = reviewDTO.ReviewText,
        };

        return review;
    }

    public static ReviewDTO MapReviewToDTO(Review review)
    {
        var reviewDTO = new ReviewDTO()
        {
            Id = review.Id,
            UserId = review.UserId,
            Username = review.Username,
            MovieId = review.MovieId,
            ReviewText = review.ReviewText
        };

        return reviewDTO;
    }

    public static IList<ReviewDTO> MapReviewToDTOList(IList<Review> reviews)
    {
        var reviewDTOs = new List<ReviewDTO>();
        foreach(var review in reviews)
        {
            var reviewDTO = new ReviewDTO()
            {
                Id = review.Id,
                UserId = review.UserId,
                Username = review.Username,
                MovieId = review.MovieId,
                ReviewText = review.ReviewText
            };
            reviewDTOs.Add(reviewDTO);
        }
        return reviewDTOs;
    }
}