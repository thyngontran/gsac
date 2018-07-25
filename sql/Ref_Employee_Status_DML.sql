USE [Ruby_Emergency]
GO

DELETE from dbo.ref_employee_status
GO
INSERT INTO [dbo].[Ref_Employee_Status]
           ([Status]
           ,[Active_Ind])
     VALUES
           ('IN',1)
INSERT INTO [dbo].[Ref_Employee_Status]
           ([Status]
           ,[Active_Ind])
     VALUES
           ('OUT',1)
INSERT INTO [dbo].[Ref_Employee_Status]
           ([Status]
           ,[Active_Ind])
     VALUES
           ('SAFE',1)

INSERT INTO [dbo].[Ref_Employee_Status]
           ([Status]
           ,[Active_Ind])
     VALUES
           ('UNKNOWN',1)

  
   --        ,<Active_Ind, int,>)
GO


