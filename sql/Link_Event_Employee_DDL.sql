ALTER TABLE [dbo].[Link_Event_Employee] DROP CONSTRAINT [DF_Link_Event_Employee_Date_Created]
GO

/****** Object:  Table [dbo].[Link_Event_Employee]    Script Date: 7/25/2018 1:47:46 PM ******/
DROP TABLE [dbo].[Link_Event_Employee]
GO

/****** Object:  Table [dbo].[Link_Event_Employee]    Script Date: 7/25/2018 1:47:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Link_Event_Employee](
	[Lnk_Event_Emp_Id] [int] IDENTITY(1,1) NOT NULL,
	[Event_Id] [int] NOT NULL,
	[Employee_Id] [int] NOT NULL,
	[Employee_Status_Id] [int] NOT NULL,
	[Date_Created] [datetime] NOT NULL,
	[Active_Ind] [int] NOT NULL,
 CONSTRAINT [PK_Link_Event_Employee] PRIMARY KEY CLUSTERED 
(
	[Lnk_Event_Emp_Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Link_Event_Employee] ADD  CONSTRAINT [DF_Link_Event_Employee_Date_Created]  DEFAULT (getdate()) FOR [Date_Created]
GO


