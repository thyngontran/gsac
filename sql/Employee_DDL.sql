/****** Object:  Table [dbo].[Employee]    Script Date: 7/25/2018 1:03:09 PM ******/

DROP TABLE dbo.employee
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Employee](
	[Employee_Id] [int] IDENTITY(1,1) NOT NULL,
	[Fname] [varchar](50) NOT NULL,
	[Lname] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Building] [varchar](50) NOT NULL,
	[Floor] [INT] NOT NULL,
	[Room] [varchar](50) NOT NULL,
	[Phone] [varchar](50) NOT NULL,
	[Warden_Ind] [int] NOT NULL,
	[Active_Ind] [int] NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[Employee_Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Employee]
ADD CONSTRAINT active_ind_def  
DEFAULT 1 FOR active_ind ;  
GO  
