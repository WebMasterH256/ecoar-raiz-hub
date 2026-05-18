using System;
using System.Collections.Generic;

namespace Ecoar.Domain.Entities
{
    public abstract class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PasswordHash { get; set; }
        public string? GoogleId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Citizen : User
    {
        public int Seeds { get; set; }
        public int CompletedActivitiesCount { get; set; }
        public virtual ICollection<ActivityEnrollment> Enrollments { get; set; } = new List<ActivityEnrollment>();
    }

    public class Coordinator : User
    {
        public virtual ICollection<Activity> CreatedActivities { get; set; } = new List<Activity>();
    }

    public class Activity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime EventDate { get; set; }
        public DateTime RegistrationDeadline { get; set; }
        public int MaxParticipants { get; set; }
        public string Location { get; set; } = string.Empty;
        public int SeedReward { get; set; }
        public Guid CoordinatorId { get; set; }
        public virtual Coordinator Coordinator { get; set; } = null!;
        public virtual ICollection<ActivityEnrollment> Enrollments { get; set; } = new List<ActivityEnrollment>();
    }

    public class ActivityEnrollment
    {
        public Guid CitizenId { get; set; }
        public virtual Citizen Citizen { get; set; } = null!;
        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; } = null!;
        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
        public bool IsCompleted { get; set; }
    }
}