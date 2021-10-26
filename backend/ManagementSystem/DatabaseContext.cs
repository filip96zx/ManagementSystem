using ManagementSystem.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem
{
    public class DatabaseContext : DbContext
    {


        public DbSet<User> Users { get; set; }
        public DbSet<EmailCommand> EmailCommand { get; set; }
        public DbSet<Order> Orders { get; set; }


        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>().ToTable("Users");
            builder.Entity<EmailCommand>().ToTable("EmailCommand");
            builder.Entity<Order>().ToTable("Orders");


        }

    }
}
