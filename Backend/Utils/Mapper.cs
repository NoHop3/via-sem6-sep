using System.Security.Cryptography;
using System.Text;
using Backend.Data.Abstraction;
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
            Salt = AuthorizationProvider.GenerateSalt()
        };
        user.HashedPasword = AuthorizationProvider.HashPasword(userDTO.Password, user.Salt);
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

    public static Favourite MapFavouriteMoviteFromDTO(FavouriteDTO favouriteDTO, int userId)
    {
        var favourite = new Favourite()
        {
            Id = favouriteDTO.Id,
            UserId = userId,
            MovieId = favouriteDTO.MovieId
        };

        return favourite;
    }

    public static FavouriteDTO MapFavouriteMoviteToDTO(Favourite favourite)
    {
        var favouriteDTO = new FavouriteDTO()
        {
            Id = favourite.Id,
            UserId = favourite.User.Id,
            MovieId = favourite.MovieId
        };

        return favouriteDTO;
    }

    public static Review MapReviewFromDTO(ReviewDTO reviewDTO, int userId)
    {
        var review = new Review()
        {
            Id = reviewDTO.Id,
            UserId = userId,
            MovieId = reviewDTO.MovieId,
            ReviewStars = reviewDTO.ReviewStars,
        };

        return review;
    }

    public static ReviewDTO MapReviewToDTO(Review review)
    {
        var reviewDTO = new ReviewDTO()
        {
            Id = review.Id,
            UserId = review.User.Id,
            MovieId = review.MovieId,
            ReviewStars = review.ReviewStars
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
                UserId = review.User.Id,
                MovieId = review.MovieId,
                ReviewStars = review.ReviewStars
            };
            reviewDTOs.Add(reviewDTO);
        }
        return reviewDTOs;
    }
}