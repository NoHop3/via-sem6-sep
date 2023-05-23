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
        };

        return userDTO;
    }

    public static Favourite MapFavouriteMoviteFromDTO(FavouriteDTO favouriteDTO, int userId)
    {
        var favourite = new Favourite()
        {
            UserId = userId,
            MovieId = favouriteDTO.MovieId
        };

        return favourite;
    }

    public static FavouriteDTO MapFavouriteMoviteToDTO(Favourite favourite)
    {
        var favouriteDTO = new FavouriteDTO()
        {
            UserEmailOrUsername = favourite.User.Email,
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
            ReviewText = reviewDTO.ReviewText
        };

        return review;
    }

    public static ReviewDTO MapReviewToDTO(Review review)
    {
        var reviewDTO = new ReviewDTO()
        {
            Id = review.Id,
            Username = review.User.Email,
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
                Username = review.User.Email,
                MovieId = review.MovieId,
                ReviewText = review.ReviewText
            };
            reviewDTOs.Add(reviewDTO);
        }
        return reviewDTOs;
    }
}