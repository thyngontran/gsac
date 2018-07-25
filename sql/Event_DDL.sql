ALTER TABLE [dbo].[Event] DROP CONSTRAINT [DF_Event_Date_Ended]
GO

ALTER TABLE [dbo].[Event] DROP CONSTRAINT [DF_Event_Date_Created]
GO

/****** Object:  Table [dbo].[Event]    Script Date: 7/25/2018 1:49:28 PM ******/
DROP TABLE [dbo].[Event]
GO

/****** Object:  Table [dbo].[Event]    Script Date: 7/25/2018 1:49:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Event](
	[Event_Id] [int] IDENTITY(1,1) NOT NULL,
	[Event_Type_Id] [int] NOT NULL,
	[Date_Created] [datetime] NOT NULL,
	[Date_Ended] [datetime] NOT NULL,
	[Active_Ind] [int] NOT NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[Event_Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Event] ADD  CONSTRAINT [DF_Event_Date_Created]  DEFAULT (getdate()) FOR [Date_Created]
GO


ALTER TABLE [dbo].[Event] ADD CONSTRAINT active_ind_def   DEFAULT 1 FOR active_ind ;  
GO  
