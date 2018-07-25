USE [Ruby_Emergency]
GO

Delete from employee
GO

INSERT INTO [dbo].[Employee]
           ([Fname]
           ,[Lname]
           ,[Email]
           ,[Building]
           ,[Floor]
           ,[Room]
           ,[Phone]
           ,[Warden_Ind]
           ,[Active_Ind])
     VALUES
          ('Bruce', 'Wayne','GSAC.BW@gmail.com', 'SA20',17,'127','571-435-4966',1,1)

INSERT INTO [dbo].[Employee]
           ([Fname]
           ,[Lname]
           ,[Email]
           ,[Building]
           ,[Floor]
           ,[Room]
           ,[Phone]
           ,[Warden_Ind]
           ,[Active_Ind])
     VALUES
	      ('Clark', 'Kent','GSAC.CK@gmail.com', 'SA20',17,'128','571-435-4965',1,1)

 INSERT INTO [dbo].[Employee]
           ([Fname]
           ,[Lname]
           ,[Email]
           ,[Building]
           ,[Floor]
           ,[Room]
           ,[Phone]
           ,[Warden_Ind]
           ,[Active_Ind])
     VALUES        ('Bruce', 'Banner','GSAC.BB1@gmail.com', 'SA20',17,'126','571-435-4964',1,1)

INSERT INTO [dbo].[Employee]
           ([Fname]
           ,[Lname]
           ,[Email]
           ,[Building]
           ,[Floor]
           ,[Room]
           ,[Phone]
           ,[Warden_Ind]
           ,[Active_Ind])
     VALUES  ('Donna', 'Troy','GSAC.DT@gmail.com', 'SA20',17,'125','571-435-4963',1,1)
INSERT INTO [dbo].[Employee]
           ([Fname]
           ,[Lname]
           ,[Email]
           ,[Building]
           ,[Floor]
           ,[Room]
           ,[Phone]
           ,[Warden_Ind]
           ,[Active_Ind])
     VALUES          ('Selina', 'Kyle','GSAC.SK1@gmail.com', 'SA20',17,'124','571-435-4962',1,1)

  INSERT INTO [dbo].[Employee]
           ([Fname]
           ,[Lname]
           ,[Email]
           ,[Building]
           ,[Floor]
           ,[Room]
           ,[Phone]
           ,[Warden_Ind]
           ,[Active_Ind])
     VALUES        ('Barbara', 'Gordon','GSAC.BG@gmail.com', 'SA20',17,'123','571-435-4961',1,1)
	   
		   /*<Fname, varchar(50),>
           ,<Lname, varchar(50),>
           ,<Email, varchar(50),>
           ,<Building, varchar(50),>
           ,<Floor, int,>
           ,<Room, varchar(50),>
           ,<Phone, varchar(50),>
           ,<Warden_Ind, int,>
           ,<Active_Ind, int,>)*/
GO


