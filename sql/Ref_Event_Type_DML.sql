USE [Ruby_Emergency]
GO

Delete from dbo.Ref_Event_Type
GO

INSERT INTO [dbo].[Ref_Event_Type]
           ([Emergency_Type]
           ,[Description]
		   ,[Icon]
           ,[Active_Ind])
     VALUES
           ('FIRE', 'Take Stairs down and rally to Freedom Park', 'fas fa-fire', 1)
GO

INSERT INTO [dbo].[Ref_Event_Type]
           ([Emergency_Type]
           ,[Description]
		   ,[Icon]
           ,[Active_Ind])
     VALUES
           ('GAS LEAK', 'Take Stairs down and rally to Freedom Park','fas fa-gas-pump', 1)
GO
INSERT INTO [dbo].[Ref_Event_Type]
           ([Emergency_Type]
           ,[Description]
 		   ,[Icon]
          ,[Active_Ind])
     VALUES
           ('SHOOTER', 'Go to designated lockdown room', 'fas fa-user-ninja', 1)
GO

