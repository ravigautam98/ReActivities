
namespace Domains.Models
{
    public class Activity
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Title { get; set; }
        public bool IsCompleted { get; set; }

        public string Description { get; set; }
    }
}
