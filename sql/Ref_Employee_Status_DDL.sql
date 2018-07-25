ALTER TABLE [dbo].[Ref_Employee_Status] DROP CONSTRAINT [DF_Ref_Employee_Status_Active_Ind]
GO

/****** Object:  Table [dbo].[Ref_Employee_Status]    Script Date: 7/25/2018 1:45:47 PM ******/
DROP TABLE [dbo].[Ref_Employee_Status]
GO

/****** Object:  Table [dbo].[Ref_Employee_Status]    Script Date: 7/25/2018 1:45:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Ref_Employee_Status](
	[Employee_Status_Id] [int] IDENTITY(1,1) NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[Active_Ind] [int] NULL,
 CONSTRAINT [PK_Ref_Employee_Status] PRIMARY KEY CLUSTERED 
(
	[Employee_Status_Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Ref_Employee_Status] ADD  CONSTRAINT [DF_Ref_Employee_Status_Active_Ind]  DEFAULT ((1)) FOR [Active_Ind]
GO

ALTER TABLE [dbo].[Ref_Employee_Status] ADD CONSTRAINT active_ind_def   DEFAULT 1 FOR active_ind ;  
GO  



