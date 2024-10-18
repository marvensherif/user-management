// Models/Profile.cs
namespace kemet_task.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public required string Address { get; set; }
    }
}
