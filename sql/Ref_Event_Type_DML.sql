USE [Ruby_Emergency]
GO

INSERT INTO [dbo].[Ref_Event_Type]
           ([Emergency_Type]
           ,[Description]
           ,[Active_Ind])
     VALUES
           ('FIRE', 'Take Stairs down and rally to Freedom Park', 1)
GO

INSERT INTO [dbo].[Ref_Event_Type]
           ([Emergency_Type]
           ,[Description]
           ,[Active_Ind])
     VALUES
           ('GAS LEAK', 'Take Stairs down and rally to Freedom Park', 1)
GO
INSERT INTO [dbo].[Ref_Event_Type]
           ([Emergency_Type]
           ,[Description]
           ,[Active_Ind])
     VALUES
           ('SHOOTER', 'Go to designated lockdown room', 1)
GO

delete from dbo.Ref_Event_Type where Event_Type_Id =4
go