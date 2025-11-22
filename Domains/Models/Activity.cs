
using System.ComponentModel.DataAnnotations;

namespace Domains.Models
{
    public class Activity
    {
        
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }

        [StringLength(100, ErrorMessage = "Description cannot exceed 100 characters.")]
        public string Description { get; set; }
    }
}
