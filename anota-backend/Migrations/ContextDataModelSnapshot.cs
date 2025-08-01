﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using anota_backend.Context;

#nullable disable

namespace anota_backend.Migrations
{
    [DbContext(typeof(ContextData))]
    partial class ContextDataModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("anota_backend.Models.CompanyModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pass")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PathRouteKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SecondaryColor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("User")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("primaryColor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("anota_backend.Models.CourtModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("Company_id")
                        .HasColumnType("bigint");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("Image_url")
                        .HasColumnType("longtext");

                    b.Property<int>("Modality")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("Company_id");

                    b.ToTable("Court");
                });

            modelBuilder.Entity("anota_backend.Models.PaymentModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("PaidAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PaymentGatewayTransactionId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("SubscriptionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SubscriptionId");

                    b.ToTable("Payment");
                });

            modelBuilder.Entity("anota_backend.Models.PlanModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Interval")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.HasKey("Id");

                    b.ToTable("Plan");
                });

            modelBuilder.Entity("anota_backend.Models.ReservationConfigModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("Court_id")
                        .HasColumnType("bigint");

                    b.Property<int>("Day_of_week")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("End_time")
                        .HasColumnType("time(6)");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<TimeSpan>("Start_time")
                        .HasColumnType("time(6)");

                    b.HasKey("Id");

                    b.ToTable("ReservationsConfig");
                });

            modelBuilder.Entity("anota_backend.Models.ReservationModel", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<long>("Court_id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("Created_date")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("End_date")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsPaid")
                        .HasColumnType("tinyint(1)");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<string>("User_name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("User_phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("modality")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Court_id");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("anota_backend.Models.SubscriptionModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CanceledAt")
                        .HasColumnType("datetime(6)");

                    b.Property<long>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("CurrentPeriodEndsAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("PlanId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime?>("TrialEndsAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("TrialStartsAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("PlanId");

                    b.ToTable("Subscription");
                });

            modelBuilder.Entity("anota_backend.Models.CourtModel", b =>
                {
                    b.HasOne("anota_backend.Models.CompanyModel", "Company")
                        .WithMany()
                        .HasForeignKey("Company_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("anota_backend.Models.PaymentModel", b =>
                {
                    b.HasOne("anota_backend.Models.SubscriptionModel", "Subscription")
                        .WithMany()
                        .HasForeignKey("SubscriptionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Subscription");
                });

            modelBuilder.Entity("anota_backend.Models.ReservationModel", b =>
                {
                    b.HasOne("anota_backend.Models.CourtModel", "Court")
                        .WithMany()
                        .HasForeignKey("Court_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Court");
                });

            modelBuilder.Entity("anota_backend.Models.SubscriptionModel", b =>
                {
                    b.HasOne("anota_backend.Models.CompanyModel", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("anota_backend.Models.PlanModel", "Plan")
                        .WithMany()
                        .HasForeignKey("PlanId");

                    b.Navigation("Company");

                    b.Navigation("Plan");
                });
#pragma warning restore 612, 618
        }
    }
}
