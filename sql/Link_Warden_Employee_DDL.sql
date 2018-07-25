ALTER TABLE [dbo].[Link_Warden_Employee] DROP CONSTRAINT [DF_Link_Warden_Employee_Date_Created]
GO

/****** Object:  Table [dbo].[Link_Warden_Employee]    Script Date: 7/25/2018 1:47:11 PM ******/
DROP TABLE [dbo].[Link_Warden_Employee]
GO

/****** Object:  Table [dbo].[Link_Warden_Employee]    Script Date: 7/25/2018 1:47:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Link_Warden_Employee](
	[Lnk_Warden_Emp_Id] [int] NOT NULL,
	[Warden_Id] [int] NOT NULL,
	[Employee_Id] [int] NOT NULL,
	[Active_Ind] [int] NOT NULL,
	[Date_Created] [datetime] NOT NULL,
 CONSTRAINT [PK_Link_Warden_Employee] PRIMARY KEY CLUSTERED 
(
	[Lnk_Warden_Emp_Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Link_Warden_Employee] ADD  CONSTRAINT [DF_Link_Warden_Employee_Date_Created]  DEFAULT (getdate()) FOR [Date_Created]
GO


